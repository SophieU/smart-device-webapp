import React from 'react';

let time = (new Date().getMonth()+1)+'月'+(new Date().getDate())+'日';

const DataBall = (props)=>(
    <div className="data-ball ">
        <div className="data-show-wrapper ">
            <div className={props.measuring?"gradient-bg rotate":"gradient-bg"}></div>
            <div className="data-show">
                <div className={props.now==="睡眠"?'center-data':'hide'} >
                    <h3>{props.value}</h3>
                    <p>翻身次数</p>
                </div>
                <div className={props.now==="计步"?'center-data':'hide'}>
                    <h3 className="walk-data">{props.value}步</h3>
                </div>
                <div className={props.now==="血压"?'center-data':'hide'}>
                    <h3>120/80</h3>
                    <p>开始测量</p>
                </div>
                <div className={props.now==="心率"?'center-data':'hide'}>
                    <h3>{props.value}</h3>
                    <p style={props.measuring?{display:"none"}:{display:""}} onClick={props.measure}>开始测量</p>
                    <p style={props.measuring?{display:""}:{display:"none"}}>测量中</p>
                </div>

            </div>
        </div>
        <p className="data-time">{time}</p>
    </div>
);


export default DataBall;