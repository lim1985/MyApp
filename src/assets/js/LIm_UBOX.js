import store from '@/store/'
class LUbox {        
		static InitWS()
		{
			// let	CODER_ALAW		= 0;
			// let	CODER_PCM		= 1;
			// let	CODER_G729		= 3;
			// let	CODER_SPEEX	= 20;
			// let	CODER_ULAW		= 100;
			// let	UBOX_MODE_RECORD	= 0;		//录音模式， 通常使用的模式
			// let	UBOX_MODE_DIAG		= 1;		//诊断模式， 用于捕获线路信息，供信号分析之用，支持的语音编码方式是CODER_PCM
			// let	UBOX_MODE_CONFIG	= 2;		//配置模式，
			// let	hdl = -1;
			// let	UBOX_STATE_RESET     = 1;			//复位态，表示既非振铃也非摘机的状态。如果此前为振铃态，则此状态表示振铃已停止，如果此前为摘机态，则此状态表示已挂机。
			// let	UBOX_STATE_RINGING   = 2;			//振铃态，表示已检测到线路振铃信号，如果振铃停止，则将触发 UBOX_EVENT_RESET 事件，并汇报 UBOX_STATE_RESET 状态。
			// let	UBOX_STATE_HOOK_OFF  = 3;			//摘机态，
			// let	UBOX_STATE_HANG		 = 4;			  //悬空态，
			// let	UBOX_STATE_IDLE     = 5;              //空闲中，挂机
			// let	UBOX_STATE_REVERSE_HOOKOFF = 6;     //反向摘机，指软件摘机
			// let	UBOX_STATE_POSITIVIE_HOOKOFF = 7;   //正向摘机，指软件摘机
			// let  ubox={                    //全局声明
			// 			lines:[],
			// 			linenum:0
			// 		};
			let ws=null
			if(window.WebSocket)
			{
				LUbox.showStatus('浏览器支持WebSocket')
				let wsproto = (location.protocol === 'https:') ? "wss://" : "ws://";
				// let wsport = (location.protocol === 'https:') ? ":7443" : ":5066";
				ws = new WebSocket(wsproto+'127.0.0.1:8054/');
				ws.onopen=(ev)=>{
						console.log(ev)
						LUbox.showStatus(`open：${JSON.stringify(ev)}`)
				}
				ws.onerror =(ev)=> { 
					console.log(`error`)
					LUbox.showStatus("websocket error:"+JSON.stringify(ev)); };
				ws.onclose =(ev)=> { 
					console.log(`onclose`)  
					LUbox.showStatus("websocket close:"+JSON.stringify(ev));  ws = null;};
					ws.onmessage =(ev)=> {
						console.log(`onmessage`)  
						//console.log(ev);					
					let msg = eval('(' + ev.data + ')');	
					console.log(msg)			
					if(msg.type || msg.handle)
					{
					store.commit('SET_TYPE',msg.type)	
					store.commit('SET_HANDLEID',msg.handle)
					}
					if(msg.handle)
					{
					store.commit('SET_HANDLEID',msg.handle)	
					}
					if(msg.event)//任何操作都返回
					{
					store.commit('SET_EVENT',msg.event)		
					}
					if(msg.event=='callerId')//发现来电号码
					{
					store.commit('SET_PHONENUMER',msg.callernumber)			
					}
					if(msg.event=='hookup' || msg.event=='ringCancel')//挂机或者取消拨打
					{
					store.commit('SET_PHONENUMER','')		
					}
						// if(msg.type || msg.handle)
						// {					
						// store.commit('SET_TYPE',msg.type)	
						// store.commit('SET_HANDLEID',msg.handle)
						// }
						// // if(msg.handle)
						// // {
						// // store.commit('SET_HANDLEID',msg.handle)
						// // }
						// if (msg.event=='hookoff')
						// {
						// console.log('电话拿起了')
						// console.log(msg.event)						
						// store.commit('SET_EVENT',msg.event)	
						// }
						// else if(msg.event=="hookup")
						// {
						// console.log('电话放下了')
						// console.log(msg.event)
						// store.commit('SET_EVENT',msg.event)		
						// }
						// else if(msg.event=='ring')
						// {
						// store.commit('SET_EVENT',msg.event)														
						// }else if(msg.event=='callerId')
						// {
						// store.commit('SET_PHONENUMER',msg.callernumber)			
						// }
						// else if(msg.event=='ringCancel')
						// {
						// store.commit('SET_EVENT',msg.event)			
						// }
			
					}

			}

		}
		static showStatus(msg){
			console.log(msg)
		}
}
export default LUbox
// let  CODER_ALAW		= 0;
// let  CODER_PCM		= 1;
// let	 CODER_G729		= 3;
// let	 CODER_SPEEX	= 20;
// let	 CODER_ULAW		= 100;
// let   UBOX_MODE_RECORD	= 0;		//录音模式， 通常使用的模式
// let	  UBOX_MODE_DIAG		= 1;		//诊断模式， 用于捕获线路信息，供信号分析之用，支持的语音编码方式是CODER_PCM
// let	  UBOX_MODE_CONFIG	= 2;		//配置模式，
// let  hdl = -1;

// let     UBOX_STATE_RESET     = 1;			//复位态，表示既非振铃也非摘机的状态。如果此前为振铃态，则此状态表示振铃已停止，如果此前为摘机态，则此状态表示已挂机。
// let		UBOX_STATE_RINGING   = 2;			//振铃态，表示已检测到线路振铃信号，如果振铃停止，则将触发 UBOX_EVENT_RESET 事件，并汇报 UBOX_STATE_RESET 状态。
// let		UBOX_STATE_HOOK_OFF  = 3;			//摘机态，
// let		UBOX_STATE_HANG		 = 4;			  //悬空态，
// let     UBOX_STATE_IDLE     = 5;              //空闲中，挂机
// let		UBOX_STATE_REVERSE_HOOKOFF = 6;     //反向摘机，指软件摘机
// let		UBOX_STATE_POSITIVIE_HOOKOFF = 7;   //正向摘机，指软件摘机


// let  ubox={                    //全局声明
//             lines:[],
// 			linenum:0
// 		 };
	
// let  ws = null;	