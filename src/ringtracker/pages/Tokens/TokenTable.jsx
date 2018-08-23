import React, { Component } from 'react';
import { Badge,Spin} from 'antd'
import ListPagination from 'LoopringUI/components/ListPagination'
import routeActions from 'common/utils/routeActions'
import intl from 'react-intl-universal'
import {getFormatNum} from 'modules/formatter/common'

export default class TokenTable extends Component {

  render() {
    const {tokens={items:[],loading:false}}= this.props // MOCK

    return (
      <div className="">
        <ListPagination list={tokens}/>
        <Spin spinning={tokens.loading}>
          <div>
            <table className="table table-responsive fs14" >
              <thead className="">
              <tr className="">
                <th className="">#</th>
                <th className="">{intl.get('title.token')}</th>
                <th className="">{intl.get('title.last_price')}</th>
                <th className="">{intl.get('title.trades')}</th>
                <th className="">{intl.get('title.volume')}</th>
                <th className="">{intl.get('title.options')}</th>
              </tr>
              </thead>
              <tbody className="">
              {
                tokens.items.map((item,index)=>{
                  return (
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>{item.token}</td>
                      <td>
                        ¥{getFormatNum(item.lastPrice)}
                      </td>
                      <td>
                        {getFormatNum(item.trade)}
                      </td>
                      <td>
                        <div>¥{getFormatNum(item.legalVolume)}</div>
                        <div className="color-black-2 fs12">{item.tokenVolume} {item.token}</div>
                      </td>
                      <td>
                        <a onClick={routeActions.gotoPath.bind(this,`/tokens/${item.token}`)}>{intl.get('options.view_detail')}</a>
                      </td>
                    </tr>
                  )
                })
              }
              {
                tokens && tokens.items && tokens.items.length === 0 &&
                <tr><td colSpan='100'><div className="text-center">{intl.get('common.list.no_data')}</div></td></tr>
              }
              </tbody>
            </table>
          </div>
        </Spin>
        <ListPagination list={tokens}/>
      </div>
    )
  }
}
