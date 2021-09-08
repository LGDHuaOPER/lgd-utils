/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-01 17:00:01
 * @LastEditTime: 2021-09-05 00:16:15
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\cached-storage\__tests__\index.test.ts
 */

import _ from 'lodash'
import delay from 'delay'
import globalthis from 'globalthis'

import CachedStorage from '../src/index'

const globalThis = globalthis()

describe('@lgd-utils/cached-storage index', () => {
  const cachedStorage = new CachedStorage()

  const bucket = '__TEST_BUCKET__'
  const expiryMilliseconds = 1 * cachedStorage.expiryMilliseconds
  const expiryMillisecondsDouble = 2 * expiryMilliseconds
  const expiryTime = expiryMilliseconds / cachedStorage.expiryMilliseconds
  const expiryTimeDouble = 2 * expiryTime
  const testKey = '__TEST_KEY__'
  const testValue = '__TEST_VALUE__'
  const testKey2 = '__TEST_KEY2__'
  const testValue2 = '__TEST_VALUE2__'
  const testKey3 = '__TEST_KEY3__'
  const testValue3 = '__TEST_VALUE3__'
  const testKey4 = '__TEST_KEY4__'
  const testValue4 = '__TEST_VALUE4__'
  const testObjectKey = '__TEST_OBJECT_KEY__'
  const testObjectValue = { key: 'value' }

  test.concurrent.each([
    { key: 'bucketsKeysRecord', expectFn: 'toEqual', expectDesc: `equal to {}`, expected: {} },
    { key: 'bucketHistory', expectFn: 'toEqual', expectDesc: `equal to ['']`, expected: [''] },
    { key: 'isSupportStorage', expectFn: 'toBeUndefined', expectDesc: `equal to undefined`, expected: void 0 },
    { key: 'isSupportJSON', expectFn: 'toBeUndefined', expectDesc: `equal to undefined`, expected: void 0 },
    { key: 'length', expectFn: 'toBe', expectDesc: `equal to 0`, expected: 0 },
    {
      key: 'cachePrefix',
      expectFn: 'toBe',
      expectDesc: `equal to 'CachedStorage::Common'`,
      expected: 'CachedStorage::Common',
    },
    {
      key: 'cacheSuffix',
      expectFn: 'toBe',
      expectDesc: `equal to 'CachedStorageExpiration'`,
      expected: 'CachedStorageExpiration',
    },
    { key: 'compress', expectFn: 'toBeFunction', expectDesc: `typeof function`, expected: void 0 },
    { key: 'decompress', expectFn: 'toBeFunction', expectDesc: `typeof function`, expected: void 0 },
    { key: 'expiryMilliseconds', expectFn: 'toBe', expectDesc: `equal to 60 * 1000`, expected: 60 * 1000 },
    { key: 'expiryRadix', expectFn: 'toBe', expectDesc: `equal to 10`, expected: 10 },
    {
      key: 'expiryToStringKeys',
      expectFn: 'toEqual',
      expectDesc: `equal to ['toISOString', 'toString', 'valueOf']`,
      expected: ['toISOString', 'toString', 'valueOf'],
    },
    { key: 'keySeparator', expectFn: 'toBe', expectDesc: `equal to '::'`, expected: '::' },
    {
      key: 'maxDate',
      expectFn: 'toBe',
      expectDesc: `equal to Math.floor(8.64e15 / (60 * 1000))`,
      expected: Math.floor(8.64e15 / (60 * 1000)),
    },
    {
      key: 'storage',
      expectFn: 'toEqual',
      expectDesc: `equal to globalThis.localStorage`,
      expected: globalThis.localStorage,
    },
  ])(
    `Check the attributes for cachedStorage. cachedStorage.$key is $expectDesc`,
    async ({ key, expectFn, expected }) => {
      _.get(expect(_.get(cachedStorage, key as string)), expectFn as string)(expected)
    },
  )

  it(`cachedStorage.setBucket() success`, () => {
    expect(cachedStorage.setItem(testKey4, testValue4)).toBeTruthy()
    expect(cachedStorage.setBucket(bucket)).toBeTruthy()
    expect(cachedStorage.bucket).toBe(bucket)
    expect(cachedStorage.getItem(testKey4, bucket)).toBeNull()
  })

  it(`cachedStorage.setItem() success`, () => {
    expect(cachedStorage.setItem(testKey, testValue, expiryTime)).toBeTruthy()
    expect(cachedStorage.setItem(testKey2, testValue2, expiryTimeDouble)).toBeTruthy()
    expect(cachedStorage.setItem(testKey3, testValue3)).toBeTruthy()
    expect(cachedStorage.setItem(testKey4, testValue4)).toBeTruthy()
    expect(cachedStorage.setItem(testObjectKey, testObjectValue, expiryTime)).toBeTruthy()
  })

  it(`cachedStorage.removeItem() success`, () => {
    expect(cachedStorage.removeItem(testKey4, bucket)).toBeTruthy()
    expect(cachedStorage.getItem(testKey4, bucket)).toBeNull()
  })

  it(
    'cachedStorage.getItem() success',
    async () => {
      expect.assertions(12)

      expect(cachedStorage.getItem(testKey, bucket)).toBe(testValue)
      expect(cachedStorage.getItem(testKey2)).toBe(testValue2)
      expect(cachedStorage.getItem(testKey3, bucket)).toBe(testValue3)
      expect(cachedStorage.getItem(testKey4, bucket)).toBeNull()
      expect(cachedStorage.getItem(testKey4, '')).toBe(testValue4)
      expect(cachedStorage.getItem(testObjectKey)).toEqual(testObjectValue)

      try {
        await delay(expiryMilliseconds)
        expect(cachedStorage.getItem(testKey)).toBeNull()
        expect(cachedStorage.getItem(testKey2, bucket)).toBe(testValue2)
        expect(cachedStorage.getItem(testKey3)).toBe(testValue3)
        expect(cachedStorage.getItem(testKey4, bucket)).toBeNull()
        expect(cachedStorage.getItem(testKey4, '')).toBe(testValue4)
        expect(cachedStorage.getItem(testObjectKey, bucket)).toBeNull()
      } catch (e) {
        expect(e).toMatch('error')
      }
    },
    expiryMilliseconds + 5000,
  )

  it(`cachedStorage.getItems() success`, () => {
    expect(cachedStorage.getItems()).toEqual([])
    expect(cachedStorage.getItems(testKey2)).toEqual([])
    expect(cachedStorage.getItems(true)).toEqual([])
    expect(cachedStorage.getItems(testKey2, bucket)).toEqual([
      {
        bucket,
        key: testKey2,
        value: testValue2,
      },
    ])
    expect(cachedStorage.getItems(testKey2, true)).toEqual([
      {
        bucket: '',
        key: testKey2,
        value: null,
      },
      {
        bucket: bucket,
        key: testKey2,
        value: testValue2,
      },
    ])
    expect(cachedStorage.getItems(true, true)).toEqual([
      {
        bucket: '',
        key: testKey4,
        value: testValue4,
      },
      {
        bucket: bucket,
        key: testKey,
        value: null,
      },
      {
        bucket: bucket,
        key: testKey2,
        value: testValue2,
      },
      {
        bucket: bucket,
        key: testKey3,
        value: testValue3,
      },
      {
        bucket: bucket,
        key: testKey4,
        value: null,
      },
      {
        bucket: bucket,
        key: testObjectKey,
        value: null,
      },
    ])
    expect(cachedStorage.getItems(true, bucket, 'Mapping')).toEqual({
      [bucket]: {
        [testKey]: null,
        [testKey2]: testValue2,
        [testKey3]: testValue3,
        [testKey4]: null,
        [testObjectKey]: null,
      },
    })
  })

  it.skip(
    `cachedStorage.clear() success`,
    async () => {
      expect.assertions(9)

      expect(cachedStorage.length).toBe(6)

      try {
        await delay(expiryMilliseconds)
        expect(cachedStorage.clear(bucket, true)).toBeTruthy()
        expect(cachedStorage.length).toBe(4)
        expect(cachedStorage.clear(bucket, false)).toBeTruthy()
        expect(cachedStorage.length).toBe(2)
        expect(cachedStorage.clear(true, true)).toBeTruthy()
        expect(cachedStorage.length).toBe(2)
        expect(cachedStorage.clear(true, false)).toBeTruthy()
        expect(cachedStorage.length).toBe(0)
      } catch (e) {
        expect(e).toMatch('error')
      }
    },
    expiryMilliseconds + 5000,
  )

  it(`cachedStorage.resetBucket() success`, () => {
    cachedStorage.resetBucket()
    expect(cachedStorage.bucket).toBe('')
    expect(cachedStorage.bucketHistory).toEqual(['', bucket, ''])
  })

  it(`cachedStorage.setExpiryMilliseconds() success`, () => {
    cachedStorage.setExpiryMilliseconds(expiryMillisecondsDouble)
    expect(cachedStorage.expiryMilliseconds).toBe(expiryMillisecondsDouble)
  })

  it(`cachedStorage.getExpiryMilliseconds() success`, () => {
    expect(cachedStorage.getExpiryMilliseconds()).toBe(expiryMillisecondsDouble)
  })

  it(`cachedStorage.supported() success`, () => {
    expect(cachedStorage.supported()).toBe(cachedStorage.isSupportStorage)
  })

  it(`cachedStorage.switchWarnings() success`, () => {
    cachedStorage.switchWarnings(true)
    expect(cachedStorage.warnings).toBe(true)
  })
})
