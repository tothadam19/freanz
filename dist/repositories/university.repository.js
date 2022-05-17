"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniversityRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
const id_gen_1 = require("../services/id_gen");
let UniversityRepository = class UniversityRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(models_1.University, dataSource);
    }
    async getTemplates(universityID, facultyID, majorID) {
        try {
            const uni = await this.findById(universityID);
            const faculty = uni.faculty.find(currentFaculty => currentFaculty.facultyID === facultyID);
            if (faculty === undefined)
                return undefined;
            const major = faculty.major.find(currentMajor => currentMajor.majorID === majorID);
            if (major === undefined)
                return undefined;
            return major.templateID;
        }
        catch (error) {
            if (error.code === 'ENTITY_NOT_FOUND') {
                return undefined;
            }
            throw error;
        }
    }
    async getMajors(universityID, facultyID) {
        try {
            const uni = await this.findById(universityID);
            const faculty = uni.faculty.find(currentFaculty => currentFaculty.facultyID === facultyID);
            if (faculty === undefined)
                return undefined;
            const responseArray = [];
            faculty.major.forEach(function (current) {
                responseArray.push({
                    majorID: current.majorID,
                    majorName: current.majorName
                });
            });
            return responseArray;
        }
        catch (error) {
            if (error.code === 'ENTITY_NOT_FOUND') {
                return undefined;
            }
            throw error;
        }
    }
    async getFaculties(universityID) {
        try {
            const uni = await this.findById(universityID);
            if (uni.faculty === [])
                throw new Error('ENTITY_NOT_FOUND');
            const responseArray = [];
            uni.faculty.forEach(function (current) {
                responseArray.push({
                    facultyID: current.facultyID,
                    facultyName: current.facultyName
                });
            });
            return responseArray;
        }
        catch (error) {
            if (error.code === 'ENTITY_NOT_FOUND') {
                return 'Nincs ilyen egyetem, vagy nem létezik hozzárendelt kar';
            }
            throw error;
        }
    }
    async getUnis() {
        try {
            const responseArray = [];
            const unis = await this.find();
            unis.forEach(function (current) {
                responseArray.push({
                    universityID: current.universityID,
                    universityName: current.universityName
                });
            });
            return responseArray;
        }
        catch (error) {
            if (error.code === 'ENTITY_NOT_FOUND') {
                return undefined;
            }
            throw error;
        }
    }
    async addNewFaculty(universityID, newFacultyName) {
        try {
            const uni = await this.findById(universityID);
            const toPushElement = new models_1.Faculty({ facultyID: await this.genFID(uni), facultyName: newFacultyName, major: [] });
            uni.faculty.push(toPushElement);
            return await this.replaceById(universityID, uni);
        }
        catch (error) {
            if (error.code === 'ENTITY_NOT_FOUND') {
                return undefined;
            }
            throw error;
        }
    }
    async addNewMajor(universityID, facultyID, newMajorName) {
        try {
            const uni = await this.findById(universityID);
            const faculty = uni.faculty.find(currentFaculty => currentFaculty.facultyID === facultyID);
            if (faculty === undefined)
                return undefined;
            faculty.major.push(new models_1.Major({
                majorID: await this.genMID(faculty),
                majorName: newMajorName,
                templateID: []
            }));
            return await this.replaceById(universityID, uni);
        }
        catch (error) {
            if (error.code === 'ENTITY_NOT_FOUND') {
                return undefined;
            }
            throw error;
        }
    }
    async addNewTemplate(universityID, facultyID, majorID, newTemplateID) {
        var _a;
        try {
            const uni = await this.findById(universityID);
            const faculty = uni.faculty.find(currentFaculty => currentFaculty.facultyID = facultyID);
            if (faculty === undefined)
                return undefined;
            else {
                (_a = faculty.major.find(currentMajor => currentMajor.majorID === majorID)) === null || _a === void 0 ? void 0 : _a.templateID.push(newTemplateID);
                return await this.replaceById(universityID, uni);
            }
        }
        catch (error) {
            if (error.code === 'ENTITY_NOT_FOUND') {
                return undefined;
            }
            throw error;
        }
    }
    async createNewUniversity(newUniversityName) {
        return this.create({
            universityID: await this.genUID(),
            universityName: newUniversityName,
            faculty: []
        });
    }
    async genUID() {
        const id = (0, id_gen_1.uid)();
        return await this.checkUID(id) === false ? id : this.genUID();
    }
    async checkUID(id) {
        try {
            return await this.findById(id);
        }
        catch (error) {
            if (error.code === 'ENTITY_NOT_FOUND') {
                return false;
            }
            throw error;
        }
    }
    async genFID(university) {
        const id = (0, id_gen_1.uid)();
        return await this.checkFID(id, university) === undefined ? id : this.genFID(university);
    }
    async checkFID(id, university) {
        try {
            return university.faculty.find(faculty => faculty.facultyID === id);
        }
        catch (error) {
            if (error.code === 'ENTITY_NOT_FOUND') {
                return undefined;
            }
            throw error;
        }
    }
    async genMID(faculty) {
        const id = (0, id_gen_1.uid)();
        return await this.checkMID(id, faculty) === undefined ? id : this.genMID(faculty);
    }
    async checkMID(id, faculty) {
        try {
            return faculty.major.find(major => major.majorID === id);
        }
        catch (error) {
            if (error.code === 'ENTITY_NOT_FOUND') {
                return undefined;
            }
            throw error;
        }
    }
    async searchUnis(regexp) {
        const responseArray = [];
        const query = await this.find();
        for (const uni of query) {
            for (const faculty of uni.faculty) {
                if (faculty.major) {
                    for (const major of faculty.major) {
                        if (major.majorName.toLowerCase().includes(regexp.toLowerCase()))
                            responseArray.push({
                                majorID: major.majorID,
                                majorName: major.majorName,
                                facultyID: faculty.facultyID,
                                facultyName: faculty.facultyName,
                                universityID: uni.universityID,
                                universityName: uni.universityName,
                            });
                    }
                }
                if (faculty.facultyName.toLowerCase().includes(regexp.toLowerCase()) && !faculty.facultyName.toLowerCase().includes('nem rendelkezik'))
                    responseArray.push({
                        facultyID: faculty.facultyID,
                        facultyName: faculty.facultyName,
                        universityID: uni.universityID,
                        universityName: uni.universityName,
                    });
            }
            if (uni.universityName.toLowerCase().includes(regexp.toLocaleLowerCase()))
                responseArray.push({
                    universityID: uni.universityID,
                    universityName: uni.universityName,
                });
        }
        if (responseArray.length > 0)
            return responseArray;
        return 'A keresési feltételre nincs találat';
    }
};
UniversityRepository = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, core_1.inject)('datasources.mongoDB')),
    (0, tslib_1.__metadata)("design:paramtypes", [datasources_1.MongoDbDataSource])
], UniversityRepository);
exports.UniversityRepository = UniversityRepository;
//# sourceMappingURL=university.repository.js.map