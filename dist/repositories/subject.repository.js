"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
const id_gen_1 = require("../services/id_gen");
let SubjectRepository = class SubjectRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(models_1.Subject, dataSource);
    }
    async createNewSubject(universityID, neptunCode, subjectName, esubjectName, kreditNum, prerequisiteSubjectIDs, builtOnSubjectIDs, subjectDetailsID) {
        const id = await this.genSID();
        await this.create(new models_1.Subject({
            subjectID: id,
            universityID: universityID,
            neptunCode: neptunCode,
            subjectName: subjectName,
            eSubjectName: esubjectName,
            kreditNum: kreditNum,
            prerequisiteSubjectIDs: prerequisiteSubjectIDs,
            builtOnSubjectIDs: builtOnSubjectIDs,
            subjectDetailsID: subjectDetailsID
        }));
        return id;
    }
    async getSubject(subjectID) {
        return this.findById(subjectID);
    }
    async searchSubject(querry, universityID) {
        //check: subjectName
        let result = await this.find({ where: {
                subjectName: { 'regexp': querry },
                universityID: universityID
            } });
        if (result.length > 0)
            return result;
        //check: neptunCode
        result = await this.find({ where: {
                neptunCode: { 'regexp': querry },
                universityID: universityID
            } });
        if (result.length > 0)
            return result;
        //check: english subjectName
        result = await this.find({ where: {
                eSubjectName: { 'regexp': querry },
                universityID: universityID
            } });
        if (result.length > 0)
            return result;
        return 'not found';
    }
    async getAllSubjectsByIDs(query) {
        const responseArray = [];
        for (const id of query) {
            responseArray.push(await this.findById(id));
        }
        return responseArray;
    }
    async genSID() {
        const id = (0, id_gen_1.uid)();
        return await this.checkSID(id) === false ? id : this.genSID();
    }
    async checkSID(id) {
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
};
SubjectRepository = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, core_1.inject)('datasources.mongoDB')),
    (0, tslib_1.__metadata)("design:paramtypes", [datasources_1.MongoDbDataSource])
], SubjectRepository);
exports.SubjectRepository = SubjectRepository;
//# sourceMappingURL=subject.repository.js.map