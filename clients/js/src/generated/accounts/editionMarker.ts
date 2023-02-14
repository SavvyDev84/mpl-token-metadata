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

export type EditionMarker = Account<EditionMarkerAccountData>;

export type EditionMarkerAccountData = { key: Key; ledger: Array<number> };

export type EditionMarkerAccountArgs = { ledger: Array<number> };

export async function fetchEditionMarker(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKey: PublicKey,
  options?: RpcGetAccountOptions
): Promise<EditionMarker> {
  const maybeAccount = await context.rpc.getAccount(publicKey, options);
  assertAccountExists(maybeAccount, 'EditionMarker');
  return deserializeEditionMarker(context, maybeAccount);
}

export async function safeFetchEditionMarker(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKey: PublicKey,
  options?: RpcGetAccountOptions
): Promise<EditionMarker | null> {
  const maybeAccount = await context.rpc.getAccount(publicKey, options);
  return maybeAccount.exists
    ? deserializeEditionMarker(context, maybeAccount)
    : null;
}

export async function fetchAllEditionMarker(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKeys: PublicKey[],
  options?: RpcGetAccountsOptions
): Promise<EditionMarker[]> {
  const maybeAccounts = await context.rpc.getAccounts(publicKeys, options);
  return maybeAccounts.map((maybeAccount) => {
    assertAccountExists(maybeAccount, 'EditionMarker');
    return deserializeEditionMarker(context, maybeAccount);
  });
}

export async function safeFetchAllEditionMarker(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKeys: PublicKey[],
  options?: RpcGetAccountsOptions
): Promise<EditionMarker[]> {
  const maybeAccounts = await context.rpc.getAccounts(publicKeys, options);
  return maybeAccounts
    .filter((maybeAccount) => maybeAccount.exists)
    .map((maybeAccount) =>
      deserializeEditionMarker(context, maybeAccount as RpcAccount)
    );
}

export function getEditionMarkerGpaBuilder(
  context: Pick<Context, 'rpc' | 'serializer' | 'programs'>
) {
  const s = context.serializer;
  const programId = context.programs.get('mplTokenMetadata').publicKey;
  return gpaBuilder(context, programId)
    .registerFields<{ key: Key; ledger: Array<number> }>([
      ['key', getKeySerializer(context)],
      ['ledger', s.array(s.u8, 31)],
    ])
    .deserializeUsing<EditionMarker>((account) =>
      deserializeEditionMarker(context, account)
    )
    .whereField('key', Key.EditionMarker);
}

export function deserializeEditionMarker(
  context: Pick<Context, 'serializer'>,
  rawAccount: RpcAccount
): EditionMarker {
  return deserializeAccount(
    rawAccount,
    getEditionMarkerAccountDataSerializer(context)
  );
}

export function getEditionMarkerAccountDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<EditionMarkerAccountArgs, EditionMarkerAccountData> {
  const s = context.serializer;
  return mapSerializer<
    EditionMarkerAccountArgs,
    EditionMarkerAccountData,
    EditionMarkerAccountData
  >(
    s.struct<EditionMarkerAccountData>(
      [
        ['key', getKeySerializer(context)],
        ['ledger', s.array(s.u8, 31)],
      ],
      'EditionMarker'
    ),
    (value) =>
      ({ ...value, key: Key.EditionMarker } as EditionMarkerAccountData)
  ) as Serializer<EditionMarkerAccountArgs, EditionMarkerAccountData>;
}

export function getEditionMarkerSize(_context = {}): number {
  return 32;
}
