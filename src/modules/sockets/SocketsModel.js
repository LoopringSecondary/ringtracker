import apis from './apis'
import storage from 'modules/storage';
import {configs} from '../../common/config/data'

const namespace = 'sockets'
let initState = {
  items: [],
  item: {},
  loading: true,
  loaded: false,
  page:{
    total:0,
    size:10,
    current:0,
  },
  sort:{},
  filters:{},
  extra:{},
}
export default {
  namespace,
  state: {
    // 'url':storage.settings.get().relay.selected,
    'url':configs.relays[0].value,
    'socket':null,
    'marketcap':{...initState},
    'circulrNotify':{...initState},
  },
  effects: {
    *marketChange({payload},{call,select,put}){
      const {market}=payload
      yield put({
        type:'filtersChange',
        payload:{
          id:'tickers',
          filters:{market:market}
        }
      })
      yield put({
        type:'filtersChange',
        payload:{
          id:'depth',
          filters:{market:market}
        }
      })
      yield put({
        type:'filtersChange',
        payload:{
          id:'trades',
          filters:{market:market}
        }
      })
      yield put({
        type:'filtersChange',
        payload:{
          id:'orders',
          filters:{market:market}
        }
      })
      yield put({
        type:'extraChange',
        payload:{
          id:'loopringTickers',
          extra:{current:market} // for current page
        }
      })

    },
    *urlChange({payload},{call,select,put}){
      yield put({type:'urlChangeStart',payload})
      yield put({type:'connect',payload})
    },
    *connect({payload},{call,select,put}){
      const {url} = yield select(({ [namespace]:model }) => model )
      const socket = yield call(apis.connect, {url})
      yield put({type:'socketChange',payload:{socket}})
      if(!window.emitEvents) window.emitEvents = []
      for (var i =  window.emitEvents.length - 1; i >= 0; i--) {
        yield put(window.emitEvents[i])
      }
      delete window.emitEvents
      if(!window.onEvents) window.onEvents = []
      for (var i =  window.onEvents.length - 1; i >= 0; i--) {
        yield put(window.onEvents[i])
      }
      delete window.onEvents
    },
    *unlocked({payload},{call,select,put}){
      yield put({type:'fetch',payload:{id:'transaction'}})
      yield put({type:'fetch',payload:{id:'balance'}})
      yield put({type:'fetch',payload:{id:'pendingTx'}})
      yield put({type:'fetch',payload:{id:'orders'}})
      yield put({type:'fetch',payload:{id:'orderAllocateChange'}})
    },

    *fetch({payload},{call,select,put}){
      yield put({type:'onEvent',payload})
      yield put({type:'emitEvent',payload})
    },
    *pageChange({payload},{call,select,put}){
      yield put({type:'pageChangeStart',payload})
      yield put({type:'emitEvent',payload})
    },
    *filtersChange({payload},{call,select,put}){
      yield put({type:'filtersChangeStart',payload})
      yield put({type:'emitEvent',payload})
    },

    *sortChange({payload},{call,select,put}){
      yield put({type:'sortChangeStart',payload})
      yield put({type:'emitEvent',payload})
    },
    *queryChange({payload},{call,select,put}){
      yield put({type:'queryChangeStart',payload})
      yield put({type:'emitEvent',payload})
    },
    *emitEvent({ payload={} },{call,select,put}) {
      let {id} = payload
      const {socket,[id]:{page,filters,sort}} = yield select(({ [namespace]:model }) => model )
      if(socket){
        // console.log('emitEvent',id)
        let new_payload = {page,filters,sort,socket,id}
        yield call(apis.emitEvent, new_payload)
      }else{
        // console.log('socket is not connected! emitEvent',id)
        if(!window.emitEvents) window.emitEvents = []
        window.emitEvents.push({
          type:'emitEvent',
          payload
        })
      }
    },
    *onEvent({ payload={} }, { call, select, put }) {
      let {id} = payload
      const {socket,[id]:{page,filters,sort},extra} = yield select(({ [namespace]:model }) => model )
      if(socket){
        let new_payload = {page,filters,sort,socket,id,extra}
        yield call(apis.onEvent, new_payload)
      }else{
        // console.log('socket is not connected! onEvent',id)
        if(!window.onEvents) window.onEvents = []
        window.onEvents.push({
          type:'onEvent',
          payload
        })
      }
    },
  },
  reducers: {
    urlChangeStart(state, action){
      let {payload} = action
      return {
        ...state,
        ...payload
      }
    },
    socketChange(state, action){
      let {payload} = action
      return {
        ...state,
        ...payload
      }
    },
    loadingChange(state, action) {
      let {payload} = action
      let {id} = payload
      return {
        ...state,
        [id]:{
          ...state[id],
          ...payload,
        },
      }
    },
    itemsChange(state, action) {
      let {payload} = action
      let {id} = payload
      return {
        ...state,
        [id]:{
          ...state[id],
          ...payload,
        },
      }
    },
    itemChange(state, action) {
      let {payload} = action
      let {id} = payload
      return {
        ...state,
        [id]:{
          ...state[id],
          ...payload,
          item:{
            ...state[id].item,
            ...payload.item
          }
        },
      }
    },
    pageChangeStart(state,action){
      let {payload} = action
      let {id} = payload
      return {
        ...state,
        [id]:{
          ...state[id],
          page:{
            ...state[id].page,
            ...payload.page
          }
        }
      }
    },
    filtersChangeStart(state,action){
      let {payload} = action
      let {id} = payload
      return {
        ...state,
        [id]:{
          ...state[id],
          filters:{
            ...state[id].filters,
            ...payload.filters,
          },
          page:{
            ...state[id].page,
            current:1,
          }
        }
      }
    },
    sortChangeStart(state,action){
      let {payload} = action
      let {id} = payload
      return {
        ...state,
        [id]:{
          ...state[id],
          sort:{
            ...payload.sort
          }
        }
      }
    },
    queryChangeStart(state,action){
      let {payload} = action
      let {id} = payload
      return {
        ...state,
        [id]:{
          ...state[id],
          filters:{
            ...state[id].filters,
            ...payload.filters,
          },
          page:{
            ...state[id].page,
            current:1,
          },
          sort:{
            ...payload.sort
          },

        }
      }
    },
    extraChange(state,action){
      let {payload} = action;
      let {id} = payload
      return {
        ...state,
        [id]:{
          ...state[id],
          extra:{
            ...state[id].extra,
            ...payload.extra
          }
        }
      }
    },
  },


}


