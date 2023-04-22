export class UseNotAuthorized extends Error {
  constructor() {
    super('Unauthorized user.')
  }
}
