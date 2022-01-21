/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2022-01-17 15:04:26
 * @LastEditTime: 2022-01-21 17:22:49
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: /lgd-utils/packages/file-tree/src/orderHandler.ts
 */

import lodashOrderBy from 'lodash/orderBy'

function orderHandlerOptionsStringTypeHandler(options: string): {
  iteratees: Array<string | string[]>
  orders: Array<OrderHandlerOptionsOrdersStringType>
} {
  let iteratees: Array<string | string[]> = [['fs.stat', 'mtimeMs']]
  let orders: Array<OrderHandlerOptionsOrdersStringType> = ['desc']

  switch (options) {
    case 'mtimeMs':
    case 't':
    case 'time':
      iteratees = [['fs.stat', 'mtimeMs']]
      orders = ['desc']
      break
    case 'd':
    case 'directory':
    case 'isDirectory':
      iteratees = [['fs.stat', 'isDirectory']]
      orders = ['desc']
      break
    case 'f':
    case 'file':
    case 'isFile':
      iteratees = [['fs.stat', 'isFile']]
      orders = ['desc']
      break
    case 'n':
    case 'fn':
    case 'fileName':
    case 'name':
      iteratees = [['path.parse', 'name']]
      orders = ['asc']
      break
    default:
      iteratees = [options as string]
      orders = ['asc']
  }

  return {
    iteratees,
    orders,
  }
}

function orderHandlerOptionsNotObjectTypeHandler(options: OrderHandlerOptionsObjectType['iteratees']): {
  iteratees: Required<OrderHandlerOptionsObjectType>['iteratees']
  orders: Array<OrderHandlerOptionsOrdersStringType>
} {
  const toString = Object.prototype.toString
  let iteratees: Required<OrderHandlerOptionsObjectType>['iteratees'] = [['fs.stat', 'mtimeMs']]
  let orders: Array<OrderHandlerOptionsOrdersStringType> = ['desc']

  if (options === true) {
    const _options = orderHandlerOptionsStringTypeHandler('mtimeMs')
    iteratees = _options.iteratees
    orders = _options.orders
  }
  if (toString.call(options) === '[object String]') {
    const _options = orderHandlerOptionsStringTypeHandler(options as string)
    iteratees = _options.iteratees
    orders = _options.orders
  }
  if (Array.isArray(options)) {
    const _optionsReduce = options.reduce(
      (
        _result: {
          iteratees: Array<string | string[] | ((value: unknown) => unknown)>
          orders: Array<OrderHandlerOptionsOrdersStringType>
        },
        _v,
      ) => {
        if (toString.call(_v) === '[object String]') {
          const _options = orderHandlerOptionsStringTypeHandler(_v as string)
          _result.iteratees.push(_options.iteratees[0])
          _result.orders.push(_options.orders[0])
        }
        if (Array.isArray(_v)) {
          let _order: 'asc' | 'desc' = 'asc'
          if (_v[0] === 'fs.stat') {
            switch (_v[1]) {
              case 'mtimeMs':
              case 'isDirectory':
              case 'isFile':
                _order = 'desc'
                break
              default:
                _order = 'asc'
            }
          }
          if (_v[0] === 'path.parse') {
            switch (_v[1]) {
              case 'name':
                _order = 'asc'
                break
              default:
                _order = 'asc'
            }
          }
          _result.iteratees.push([..._v])
          _result.orders.push(_order)
        }
        if (toString.call(_v) === '[object Function]') {
          _result.iteratees.push(_v)
          _result.orders.push('asc')
        }

        return _result
      },
      {
        iteratees: [],
        orders: [],
      },
    )

    iteratees = _optionsReduce.iteratees
    orders = _optionsReduce.orders
  }
  if (toString.call(options) === '[object Function]') {
    iteratees = [options as (value: unknown) => unknown]
    orders = ['asc']
  }

  return {
    iteratees,
    orders,
  }
}

export default function orderHandler(
  fileInfo: FileInfo | FileChildren,
  options?: OrderHandlerOptions,
): FileInfo | FileChildren {
  if (options === false || options === '' || (Array.isArray(options) && options.length === 0)) return fileInfo

  const toString = Object.prototype.toString
  if (toString.call(options) === '[object Object]') {
    let { iteratees, orders } = options as OrderHandlerOptionsObjectType
    if (iteratees === false || iteratees === '' || (Array.isArray(iteratees) && iteratees.length === 0)) return fileInfo

    const { iteratees: _iteratees, orders: _orders } = orderHandlerOptionsNotObjectTypeHandler(iteratees)
    if (
      (Array.isArray(orders) && orders.filter((_order) => ['asc', 'desc'].includes(_order)).length > 0) ||
      ['asc', 'desc'].includes(orders as 'asc' | 'desc')
    ) {
      iteratees = _iteratees
    } else {
      iteratees = _iteratees
      orders = _orders
    }
    options = {
      ...(options as OrderHandlerOptionsObjectType),
      iteratees,
      orders,
    } as OrderHandlerOptionsObjectType
  } else {
    options = orderHandlerOptionsNotObjectTypeHandler(
      options as OrderHandlerOptionsObjectType['iteratees'],
    ) as OrderHandlerOptionsObjectType
  }

  if (Array.isArray(fileInfo)) {
    return fileInfo.map((_fileInfo) => orderHandler(_fileInfo, options)) as FileChildren
  } else {
    let children = fileInfo.children || []
    if (children && children.length > 0) {
      children = lodashOrderBy(children, options.iteratees, options.orders) as FileChildren
    }

    return {
      ...fileInfo,
      ['fs.stat']: {
        ...fileInfo['fs.stat'],
      },
      ['path.parse']: {
        ...fileInfo['path.parse'],
      },
      children: children.length === 0 ? void 0 : (orderHandler(children, options) as FileChildren),
    }
  }
}
