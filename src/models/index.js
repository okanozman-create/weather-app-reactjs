// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const PostStatus = {
  "ACTIVE": "ACTIVE",
  "INACTIVE": "INACTIVE"
};

const { Todo, Post } = initSchema(schema);

export {
  Todo,
  Post,
  PostStatus
};