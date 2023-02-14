/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Account,
  Context,
  PublicKey,
  RpcAccount,
  RpcGetAccountOptions,
  RpcGetAccountsOptions,
  Serializer,
  assertAccountExists,
  deserializeAccount,
  gpaBuilder,
  mapSerializer,
} from '@metaplex-foundation/umi-core';
import { Key, getKeySerializer } from '../types';

export type Edition = Account<EditionAccountData>;

export type EditionAccountData = {
  key: Key;
  parent: PublicKey;
  edition: bigint;
};

export type EditionAccountArgs = {
  parent: PublicKey;
  edition: number | bigint;
};

export async function fetchEdition(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKey: PublicKey,
  options?: RpcGetAccountOptions
): Promise<Edition> {
  const maybeAccount = await context.rpc.getAccount(publicKey, options);
  assertAccountExists(maybeAccount, 'Edition');
  return deserializeEdition(context, maybeAccount);
}

export async function safeFetchEdition(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKey: PublicKey,
  options?: RpcGetAccountOptions
): Promise<Edition | null> {
  const maybeAccount = await context.rpc.getAccount(publicKey, options);
  return maybeAccount.exists ? deserializeEdition(context, maybeAccount) : null;
}

export async function fetchAllEdition(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKeys: PublicKey[],
  options?: RpcGetAccountsOptions
): Promise<Edition[]> {
  const maybeAccounts = await context.rpc.getAccounts(publicKeys, options);
  return maybeAccounts.map((maybeAccount) => {
    assertAccountExists(maybeAccount, 'Edition');
    return deserializeEdition(context, maybeAccount);
  });
}

export async function safeFetchAllEdition(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKeys: PublicKey[],
  options?: RpcGetAccountsOptions
): Promise<Edition[]> {
  const maybeAccounts = await context.rpc.getAccounts(publicKeys, options);
  return maybeAccounts
    .filter((maybeAccount) => maybeAccount.exists)
    .map((maybeAccount) =>
      deserializeEdition(context, maybeAccount as RpcAccount)
    );
}

export function getEditionGpaBuilder(
  context: Pick<Context, 'rpc' | 'serializer' | 'programs'>
) {
  const s = context.serializer;
  const programId = context.programs.get('mplTokenMetadata').publicKey;
  return gpaBuilder(context, programId)
    .registerFields<{ key: Key; parent: PublicKey; edition: number | bigint }>([
      ['key', getKeySerializer(context)],
      ['parent', s.publicKey],
      ['edition', s.u64],
    ])
    .deserializeUsing<Edition>((account) =>
      deserializeEdition(context, account)
    )
    .whereField('key', Key.EditionV1);
}

export function deserializeEdition(
  context: Pick<Context, 'serializer'>,
  rawAccount: RpcAccount
): Edition {
  return deserializeAccount(
    rawAccount,
    getEditionAccountDataSerializer(context)
  );
}

export function getEditionAccountDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<EditionAccountArgs, EditionAccountData> {
  const s = context.serializer;
  return mapSerializer<
    EditionAccountArgs,
    EditionAccountData,
    EditionAccountData
  >(
    s.struct<EditionAccountData>(
      [
        ['key', getKeySerializer(context)],
        ['parent', s.publicKey],
        ['edition', s.u64],
      ],
      'Edition'
    ),
    (value) => ({ ...value, key: Key.EditionV1 } as EditionAccountData)
  ) as Serializer<EditionAccountArgs, EditionAccountData>;
}

export function getEditionSize(_context = {}): number {
  return 41;
}
