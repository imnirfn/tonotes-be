import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Notes,
  User,
} from '../models';
import {NotesRepository} from '../repositories';

export class NotesUserController {
  constructor(
    @repository(NotesRepository)
    public notesRepository: NotesRepository,
  ) { }

  @get('/notes/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Notes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof Notes.prototype.uuid,
  ): Promise<User> {
    return this.notesRepository.user(id);
  }
}
