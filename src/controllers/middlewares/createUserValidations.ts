import { NextFunction, Request, Response } from 'express';
import { BaseUser } from '../../interfaces/UserInterface';
import StatusCode from '../../enums/StatusCode';

const properties = ['username', 'classe', 'level', 'password'];

function validateProperties(user: BaseUser): [boolean, string | null] {
  for (let i = 0; i < properties.length; i += 1) {
    if (!Object.prototype.hasOwnProperty.call(user, properties[i])) {
      return [false, properties[i]];
    }
  }
  return [true, null];
}

function validateUsername(name: string) {
  if (typeof name !== 'string') return [false, 'Username must be a string'];
  if (name.length <= 2) return [false, 'Username must be longer than 2 characters'];
  return [true, null];
}

function validateClasse(classe: string) {
  if (typeof classe !== 'string') return [false, 'Classe must be a string'];
  if (classe.length <= 2) return [false, 'Classe must be longer than 2 characters'];
  return [true, null];
}

function validateLevel(level: number) {
  if (typeof level !== 'number') return [false, 'Level must be a number'];
  if (level <= 0) return [false, 'Level must be greater than 0'];
  return [true, null];
}

function validatePassword(password: string) {
  if (typeof password !== 'string') return [false, 'Password must be a string'];
  if (password.length < 7) return [false, 'Password must be longer than 7 characters'];
  return [true, null];
}

function validateValues(user: BaseUser) {
  let [valid, error] = validateUsername(user.username);
  if (!valid) return [valid, error];

  [valid, error] = validateClasse(user.classe);
  if (!valid) return [valid, error];

  [valid, error] = validateLevel(user.level);
  if (!valid) return [valid, error];

  [valid, error] = validatePassword(user.password);
  if (!valid) return [valid, error];

  return [true, null];
}

function validationUser(req: Request, res: Response, next: NextFunction) {
  const user: BaseUser = req.body;

  const [valid, property] = validateProperties(user);

  if (!valid) {
    return res
      .status(StatusCode.BAD_REQUEST)
      .json({ message: `${property} is required` });
  }

  const [isValid, error] = validateValues(user);

  if (!isValid) {
    return res
      .status(StatusCode.UNPROCESSABLE_ENTITY)
      .json({ error });
  }

  next();
}

export default validationUser;