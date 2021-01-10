import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Notes} from '../models';
import {NotesRepository} from '../repositories';

export class NotesController {
  constructor(
    @repository(NotesRepository)
    public notesRepository : NotesRepository,
  ) {}

  @post('/notes', {
    responses: {
      '200': {
        description: 'Notes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Notes)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notes, {
            title: 'NewNotes',
            exclude: ['uuid'],
          }),
        },
      },
    })
    notes: Omit<Notes, 'uuid'>,
  ): Promise<Notes> {
    return this.notesRepository.create(notes);
  }

  @get('/notes/count', {
    responses: {
      '200': {
        description: 'Notes model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Notes) where?: Where<Notes>,
  ): Promise<Count> {
    return this.notesRepository.count(where);
  }

  @get('/notes', {
    responses: {
      '200': {
        description: 'Array of Notes model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Notes, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Notes) filter?: Filter<Notes>,
  ): Promise<Notes[]> {
    return this.notesRepository.find(filter);
  }

  @patch('/notes', {
    responses: {
      '200': {
        description: 'Notes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notes, {partial: true}),
        },
      },
    })
    notes: Notes,
    @param.where(Notes) where?: Where<Notes>,
  ): Promise<Count> {
    return this.notesRepository.updateAll(notes, where);
  }

  @get('/notes/{id}', {
    responses: {
      '200': {
        description: 'Notes model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Notes, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Notes, {exclude: 'where'}) filter?: FilterExcludingWhere<Notes>
  ): Promise<Notes> {
    return this.notesRepository.findById(id, filter);
  }

  @patch('/notes/{id}', {
    responses: {
      '204': {
        description: 'Notes PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notes, {partial: true}),
        },
      },
    })
    notes: Notes,
  ): Promise<void> {
    await this.notesRepository.updateById(id, notes);
  }

  @put('/notes/{id}', {
    responses: {
      '204': {
        description: 'Notes PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() notes: Notes,
  ): Promise<void> {
    await this.notesRepository.replaceById(id, notes);
  }

  @del('/notes/{id}', {
    responses: {
      '204': {
        description: 'Notes DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.notesRepository.deleteById(id);
  }
}
