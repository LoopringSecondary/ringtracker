/* eslint global-require: 0 */
import React, { Component } from 'react';
import routeActions from 'common/utils/routeActions'
const navigation = [
  // {
  //   img: require('./images/TB1wdncx1SSBuNjy0FlXXbBpVXa-200-200.png'),
  //   title: 'Volume',
  //   color: '#f8623b',
  //   count: '30',
  // },
  {
    title: 'Trades',
    color: '#37D1AB',
    count: '12,000',
    path:'/trades',
  },
  {
    title: 'Tokens',
    color: '#ffa001',
    count: '160',
    path:'/tokens',
  },
  {
    title: 'Relayers',
    color: '#42C0EA',
    count: '15',
    path:'/relayers',
  },
  {
    title: 'DEXs',
    color: '#5798F2',
    count: '5',
    path:'/dexs',
  },
  {
    title: 'Rings',
    color: '#5798F2',
    count: '8,500',
    path:'/rings',
  },

  // {
  //   img: require('./images/TB1IQ2_xYGYBuNjy0FoXXciBFXa-200-200.png'),
  //   title: '已批改作业',
  //   color: '#B277C9',
  //   count: '93',
  // },
  // {
  //   img: require('./images/TB1o2c3x4GYBuNjy0FnXXX5lpXa-200-200.png'),
  //   title: '已批阅试卷',
  //   color: '#475F93',
  //   count: '185',
  // },
  // {
  //   img: require('./images/TB1wQD_xYGYBuNjy0FoXXciBFXa-200-200.png'),
  //   title: '已评分实训',
  //   color: '#EF83C4',
  //   count: '235',
  // },
];

export default class OverviewBoard extends Component {
  static displayName = 'OverviewBoard';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="ui segments">
        <div className="ui segment">
          <div className="ml10 mr10 fs18 color-black font-weight-bold">OverView</div>
        </div>
        <div className="ui horizontal segments bg-white row">
          {navigation.map((item, index) => {
            return (
              <div key={index} className="ui segment col-auto p15">
                  <div className="text-center" style={{}}>
                    <div className="fs30 font-weight-bold color-black text-nowrap" style={{}}>{item.count}</div>
                    <div className="fs16 color-black-1 text-nowrap" style={{}}>{item.title}</div>
                    <div className="">
                      <a className="mt5 fs12" onClick={routeActions.gotoPath.bind(this,item.path)}>View All</a>
                    </div>
                  </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

