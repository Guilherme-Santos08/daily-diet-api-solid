export class UseNotAuthorizedEdit extends Error {
  constructor() {
    super('User not authorized to edit this snack.')
  }
}
