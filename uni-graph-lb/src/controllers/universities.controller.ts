import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {University} from '../models';
import {UniversityRepository} from '../repositories';


@authenticate('jwt')
export class UniversitiesController {
  constructor(
    @repository(UniversityRepository)
    public universityRepository : UniversityRepository,
  ) {}

  @post('/universities')
  @response(200, {
    description: 'University model instance',
    content: {'application/json': {schema: getModelSchemaRef(University)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(University, {
            title: 'NewUniversity',

          }),
        },
      },
    })
    university: University,
  ): Promise<University> {
    return this.universityRepository.create(university);
  }

  @get('/universities/count')
  @response(200, {
    description: 'University model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(University) where?: Where<University>,
  ): Promise<Count> {
    return this.universityRepository.count(where);
  }

  @get('/universities')
  @response(200, {
    description: 'Array of University model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(University, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(University) filter?: Filter<University>,
  ): Promise<University[]> {
    return this.universityRepository.find(filter);
  }

  @patch('/universities')
  @response(200, {
    description: 'University PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(University, {partial: true}),
        },
      },
    })
    university: University,
    @param.where(University) where?: Where<University>,
  ): Promise<Count> {
    return this.universityRepository.updateAll(university, where);
  }

  @get('/universities/{id}')
  @response(200, {
    description: 'University model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(University, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(University, {exclude: 'where'}) filter?: FilterExcludingWhere<University>
  ): Promise<University> {
    return this.universityRepository.findById(id, filter);
  }

  @patch('/universities/{id}')
  @response(204, {
    description: 'University PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(University, {partial: true}),
        },
      },
    })
    university: University,
  ): Promise<void> {
    await this.universityRepository.updateById(id, university);
  }

  @put('/universities/{id}')
  @response(204, {
    description: 'University PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() university: University,
  ): Promise<void> {
    await this.universityRepository.replaceById(id, university);
  }

  @del('/universities/{id}')
  @response(204, {
    description: 'University DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.universityRepository.deleteById(id);
  }
}
