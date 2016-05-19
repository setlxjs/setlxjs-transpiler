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
import functionCall from './functionCall';
import call from './call';
import returnStmt from './returnStmt';
import initBlock from './initBlock';
import whileLoop from './whileLoop';
import comparison from './comparison';
import prefixOperation from './prefixOperation';
import exponential from './exponential';
import forLoop from './forLoop';
import breakStmt from './breakStmt';

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
  FUNCTION_CALL,
  CALL,
  RETURN,
  INIT_BLOCK,
  WHILE_LOOP,
  COMPARISON,
  PREFIX_OPERATION,
  EXPONENTIAL,
  FOR_LOOP,
  BREAK_STMT,
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
  [FUNCTION_CALL]: functionCall,
  [CALL]: call,
  [RETURN]: returnStmt,
  [INIT_BLOCK]: initBlock,
  [WHILE_LOOP]: whileLoop,
  [COMPARISON]: comparison,
  [PREFIX_OPERATION]: prefixOperation,
  [EXPONENTIAL]: exponential,
  [FOR_LOOP]: forLoop,
  [BREAK_STMT]: breakStmt,
};
