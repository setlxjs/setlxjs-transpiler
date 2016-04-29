import block from './block';
import statement from './statement';
import primitive from './primitive';
import assignment from './assignment';
import assignableList from './assignableList';
import identifier from './identifier';
import list from './list';
import procedure from './procedure';
import disjunction from './disjunction';
import conjunction from './conjunction';
import generator from './generator';
import set from './set';
import ifStmt from './ifStmt';
import sum from './sum';
import product from './product';
import collectionAccess from './collectionAccess';

import {
  PRIMITIVE,
  IDENTIFIER,
  ASSIGNMENT,
  ASSIGNABLE_LIST,
  STATEMENT,
  BLOCK,
  CONJUNCTION,
  DISJUNCTION,
  PROCEDURE,
  LIST,
  GENERATOR,
  SET,
  IF_STMT,
  SUM,
  PRODUCT,
  COLLECTION_ACCESS,
} from '../constants/tokens';

export default {
  [PRIMITIVE]: primitive,
  [IDENTIFIER]: identifier,
  [ASSIGNMENT]: assignment,
  [ASSIGNABLE_LIST]: assignableList,
  [STATEMENT]: statement,
  [BLOCK]: block,
  [CONJUNCTION]: conjunction,
  [DISJUNCTION]: disjunction,
  [PROCEDURE]: procedure,
  [LIST]: list,
  [GENERATOR]: generator,
  [SET]: set,
  [IF_STMT]: ifStmt,
  [SUM]: sum,
  [PRODUCT]: product,
  [COLLECTION_ACCESS]: collectionAccess,
};
