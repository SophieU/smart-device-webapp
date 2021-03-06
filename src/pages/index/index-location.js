import React from 'react';
import {Link} from 'react-router-dom';
import {Toast} from 'antd-mobile';


class LocationIndex extends React.Component {
    constructor(){
        super();
        this.state={
            nowAddress:'',
            lnglat:[]
        }
    }
    shouldComponentUpdate(nextProps){
        if(nextProps.latitude===undefined||nextProps.longitude===undefined) return false;
        return true;
    }
    componentWillUpdate(prop){

        const lnglat=[prop.longitude,prop.latitude];
        if(JSON.stringify(lnglat)===JSON.stringify(this.state.lnglat)){
            //重复渲染
            return false;
        }else{

            if(!!lnglat[0]&&!!lnglat[1]){

                this.setState({
                    lnglat:lnglat
                },()=>{

                    // let _this = this;
                    this.geolocation(lnglat);
                    /*let timer = setInterval(()=>{
                        if(window.AMap){
                            _this.geolocation(lnglat);
                            window.clearInterval(timer);
                        }
                    },500)*/


                });
                return;
            }
        }

    }
    geolocation(lnglatXY){
        const AMap = window.AMap;
        const _this = this;
        /*
        * var map = new AMap.Map('index-local',{
            zoom:12,
            center: lnglatXY,
        });
        * */
        new AMap.Map('index-local',{
            zoom:12,
            center: lnglatXY,
        });

        // 在新中心点添加 marker  2018-11-16 注释
      /*  var marker = new AMap.Marker({
            map: map,
            position: lnglatXY,
        });*/
        AMap.service('AMap.Geocoder',function(){
            const geocoder = new AMap.Geocoder({
                city:"028"
            })
            geocoder.getAddress(lnglatXY,function(status,result){
                if(status==='complete'&&result.info==='OK'){

                    let addressCom = result.regeocode.addressComponent;
                    let address = addressCom.city+addressCom.district+addressCom.township+addressCom.street+addressCom.streetNumber+addressCom.building
                    _this.setState({
                        nowAddress:address,
                        lnglat:lnglatXY
                    })
                }else{
                    Toast.info('定位失败',1)
                }
            })
        })
    }


    render() {
        return (
            <Link className="index-local" to='/location'>
                <div id="index-local"></div>
                <div className="local-text"><img alt="" className="am-icon am-icon-xs" src={require('../../images/address.png')}/>{this.state.nowAddress}</div>
            </Link>)

    }
}

export default LocationIndex;