import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Notes, NotesRelations, User} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';

export class NotesRepository extends DefaultCrudRepository<
  Notes,
  typeof Notes.prototype.uuid,
  NotesRelations
> {

  public readonly user: BelongsToAccessor<User, typeof Notes.prototype.uuid>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Notes, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
