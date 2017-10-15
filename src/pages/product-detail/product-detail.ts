
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { ProductService } from '../../providers/providers';

import * as echarts from 'echarts';
 

/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

    @ViewChild('container') container: ElementRef;
    chart: any;

    //查询产品
    item: any;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public productService: ProductService) {
            
                this.item = navParams.get('item');

    }

    ionViewDidEnter() {
            
        let ctx = this.container.nativeElement;
        this.chart = echarts.init(ctx);

        console.log(this.item);
        

        // 数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest) 
        this.productService.getPrices( {'symbol':this.item.symbol} ).subscribe(
            data => {
                this.drawChart(data);
            },
                
        );

    
    }

  drawChart(data){
 
        var reverseData =  this._formatData( data.items.reverse() );
                
        var category =  reverseData.categoryData;
        var ydata =     reverseData.values;
        
        var option = this._getPriceListOpion(category,ydata);
        
        this.chart.setOption(option);
        
    }

    private _formatData(rawData)
    {
            
            var categoryData = [];
            var values = []
            
            for (var i = 0; i < rawData.length; i++) {
                
                var _item = rawData[i];
                
                categoryData.push(_item.date);

                var _value = [_item.open,_item.close,_item.low,_item.high];

                values.push(_value)
            }
            
            return {
                categoryData: categoryData,
                values: values
            };

    }

    private _getPriceListOpion(category,data){

        // var colorList = ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83', 
        //                  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];
        var colorList = ['#99cc33','#0099cc','#ff33cc'];
        //var labelFont = 'bold 12px Sans-serif';
        var tooltip = {
                    // triggerOn: 'axis',
                    // transitionDuration: 0,
                    // confine: true,
                    // bordeRadius: 4,
                    // borderWidth: 1,
                    // borderColor: '#333',
                    // backgroundColor: '#fff',
                    // textStyle: {
                    //     fontSize: 12,
                    //     color: '#333'
                    // },
                    // position: function (pos, params, el, elRect, size) {
                    //     var obj = {
                    //         top: 60
                    //     };
                    //     obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                    //     return obj;
                    // }

                    trigger: 'axis',
                    axisPointer: {
                        type: 'line'
                    }
                };

        var dataZoom = [
                {
                    textStyle: {
                        color: '#8392A5'
                    },
                    handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    handleSize: '80%',
                    dataBackground: {
                        areaStyle: {
                            color: '#8392A5'
                        },
                        lineStyle: {
                            opacity: 0.8,
                            color: '#8392A5'
                        }
                    },
                    handleStyle: {
                        color: '#fff',
                        shadowBlur: 3,
                        shadowColor: 'rgba(0, 0, 0, 0.6)',
                        shadowOffsetX: 2,
                        shadowOffsetY: 2
                    }
                }, 

                {
                    type: 'inside'
                }
            ];

        var series = [
                    {
                        type: 'candlestick',
                        name: '日K',
                        data: data,
                        itemStyle: {
                            normal: {
                                color: '#FD1050',
                                color0: '#0CF49B',
                                borderColor: '#FD1050',
                                borderColor0: '#0CF49B'
                            }
                        }
                    },
                    {
                        name: 'MA5',
                        type: 'line',
                        data: this.calculateMA(5, data),
                        smooth: true,
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                              
                                width: 1
                            }
                        }
                    },
                    {
                        name: 'MA10',
                        type: 'line',
                        data: this.calculateMA(10, data),
                        smooth: true,
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                               
                                width: 1
                            }
                        }
                    },
                    {
                        name: 'MA20',
                        type: 'line',
                        data: this.calculateMA(20, data),
                        smooth: true,
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                               
                                width: 1
                            }
                        }
                    },
                     
                ];

        var option = 
            {
                backgroundColor: '#11141a',
                color:colorList,
                title: {
                    left: 'center',
                    //text: '移动端 K线图'
                },
                legend: {
                    top: 30,
                    data: ['日K', 'MA5', 'MA10', 'MA20']
                },
                tooltip: tooltip,
                
                axisPointer: {
                    link: [{
                        xAxisIndex: [0, 1]
                    }]
                },


                xAxis: {
                    type: 'category',
                    data: category,
                    axisLine: { lineStyle: { color: '#8392A5' } }
                },
                yAxis: {
                    scale: true,
                    axisLine: { lineStyle: { color: '#8392A5' } },
                    splitLine: { show: false }
                },
                grid: {
                    bottom: 80
                },

                dataZoom: dataZoom,
                
                animation: false,
                series: series
            };

        return option;

    }

   

    calculateMA(dayCount, data) {
         
        var result = [];
        for (var i = 0, len = data.length; i < len; i++) {

            if (i < dayCount) {
                result.push('-');
                continue;
            }
           
            var sum = 0;
            for (var j = 0; j < dayCount; j++) {
                var number = Number( data[i - j][1] );
                sum += number ;
            }
            result.push((sum / dayCount).toFixed(2));
        }
        return result;
    }

  ionViewDidLoad() {
        console.log('ionViewDidLoad ProductDetailPage');
  }

}
