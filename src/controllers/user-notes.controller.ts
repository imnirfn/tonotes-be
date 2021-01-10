import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  User,
  Notes,
} from '../models';
import {UserRepository} from '../repositories';

export class UserNotesController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/notes', {
    responses: {
      '200': {
        description: 'Array of User has many Notes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Notes)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Notes>,
  ): Promise<Notes[]> {
    return this.userRepository.notes(id).find(filter);
  }

  @post('/users/{id}/notes', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Notes)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.uuid,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notes, {
            title: 'NewNotesInUser',
            exclude: ['uuid'],
            optional: ['userId']
          }),
        },
      },
    }) notes: Omit<Notes, 'uuid'>,
  ): Promise<Notes> {
    return this.userRepository.notes(id).create(notes);
  }

  @patch('/users/{id}/notes', {
    responses: {
      '200': {
        description: 'User.Notes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notes, {partial: true}),
        },
      },
    })
    notes: Partial<Notes>,
    @param.query.object('where', getWhereSchemaFor(Notes)) where?: Where<Notes>,
  ): Promise<Count> {
    return this.userRepository.notes(id).patch(notes, where);
  }

  @del('/users/{id}/notes', {
    responses: {
      '200': {
        description: 'User.Notes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Notes)) where?: Where<Notes>,
  ): Promise<Count> {
    return this.userRepository.notes(id).delete(where);
  }
}
