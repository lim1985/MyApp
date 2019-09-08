import store from '@/store/'
			// let	CODER_ALAW		= 0;
			let	CODER_PCM		= 1;
			// let	CODER_G729		= 3;
			
			// let	CODER_SPEEX	= 20;
			// let	CODER_ULAW		= 100;
			// let	UBOX_MODE_RECORD	= 0;		//录音模式， 通常使用的模式
			// let	UBOX_MODE_DIAG		= 1;		//诊断模式， 用于捕获线路信息，供信号分析之用，支持的语音编码方式是CODER_PCM
			// let	UBOX_MODE_CONFIG	= 2;		//配置模式，
			let hdl = -1;
			// let	UBOX_STATE_RESET     = 1;			//复位态，表示既非振铃也非摘机的状态。如果此前为振铃态，则此状态表示振铃已停止，如果此前为摘机态，则此状态表示已挂机。
			// let	UBOX_STATE_RINGING   = 2;			//振铃态，表示已检测到线路振铃信号，如果振铃停止，则将触发 UBOX_EVENT_RESET 事件，并汇报 UBOX_STATE_RESET 状态。
			let	UBOX_STATE_HOOK_OFF  = 3;			//摘机态，
			// let	UBOX_STATE_HANG		 = 4;			  //悬空态，
			let	UBOX_STATE_IDLE     = 5;              //空闲中，挂机
			// let	UBOX_STATE_REVERSE_HOOKOFF = 6;     //反向摘机，指软件摘机
			// let	UBOX_STATE_POSITIVIE_HOOKOFF = 7;   //正向摘机，指软件摘机
			let ubox={                    //全局声明
						lines:[],
						linenum:0
					};			
			let ws=null
class LUbox {  
	static Ubox_hookoff(uboxhdl,event)
{   
	console.log('电话拿起了')
	store.commit('SET_EVENT',event)	
	ubox.lines[uboxhdl].state =  UBOX_STATE_HOOK_OFF;
	LUbox.ubox_RecordFile();
}
	static ubox_DeviceAlarm(uboxhdl, type)
{
  // var outdata = "设备"+uboxhdl;
  //如果软件退出，USB线重新插拔一下，软件再启动还有这个提示，参考常见开发问题文档 问题1和问题2
   if(type == 1)
   {
	console.log("未能找到ubox 的MIC 设备, 设备警告,重启软件")
	//    AppendStatus("未能找到ubox 的MIC 设备, 设备警告,重启软件");
   }
   else if(type == 2)
   {
	console.log("未能打开ubox 的 MIC 设备, 设备警告,重启软件")
	//    AppendStatus("未能打开ubox 的 MIC 设备, 设备警告,重启软件");
   }
   else if(type == 3)
   {
	console.log("未能打开ubox 的放音设备, 设备警告,重启软件")
	//    AppendStatus("未能打开ubox 的放音设备, 设备警告,重启软件");
   }
   else if(type == 4)
   {
	console.log("设备故障,设备工作不正常, 重启软件")
	//    AppendStatus("设备故障,设备工作不正常, 重启软件");
   }
   else if(type == 6)
   {
	console.log("复位 audio device失败, 设备警告,重启软件")
	//    AppendStatus("复位 audio device失败, 设备警告,重启软件");//
   }
}

	static ubox_DeviceError(uboxhdl)
{
   var outdata = "设备"+uboxhdl;

   console.log(outdata)

}
	static ubox_dialnum(szCode)
	{
		console.log(szCode)
		console.log(hdl)
		
		if(hdl != -1)
	{	
		console.log(`产品ID是`)
		console.log(ubox.lines[hdl].productid )
	if((ubox.lines[hdl].productid == 1)||(ubox.lines[hdl].productid == 4))
		{
			let msgs = {
			"event": "SoftHookoff",
			"handle": hdl
		};
			console.log("软件摘机:");
			/*
			如果失败， 在notify 消息中，会报错的
			*/
		ws.send(JSON.stringify(msgs));	
        ubox.lines[hdl].state =  UBOX_STATE_HOOK_OFF;	
        setTimeout(function(){
			if(ubox.lines[hdl].state ==  UBOX_STATE_HOOK_OFF)
			{
					let msgs = {
					"event": "SendDtmf",
					"handle": hdl,
					"dtmf":szCode
				};
				console.log("拨号:"+szCode);
				/*
				如果失败， 在notify 消息中，会报错的
				*/
				ws.send(JSON.stringify(msgs));		
			}
				else
			{
				console.log("请摘起电话机1");
			}		            
				},1000);		  
		}
		else
		{	
			console.log(ubox.lines[hdl].state)
			if(ubox.lines[hdl].state ==  UBOX_STATE_HOOK_OFF)
			{
			let msgs = {
			"event": "SendDtmf",
			"handle": hdl,
			"dtmf":szCode
			};
				console.log("拨号:"+szCode);
				/*
				如果失败， 在notify 消息中，会报错的
				*/
				console.log(msgs)
				ws.send(JSON.stringify(msgs));		
			}
			else
		console.log("请摘起电话机2");
		}
	}
}
		static Ubox_Plug_In(uboxhdl)
		{
		
			console.log(uboxhdl)
			let outdata = "设备插入 句柄号:"+uboxhdl;
			if(ubox.linenum == 2)      //不考虑三个通道
			return;	  
			ubox.linenum++;
			if( ubox.lines[uboxhdl] == undefined ){
						ubox.lines[uboxhdl] = {};
					}
			ubox.lines[uboxhdl].handle = uboxhdl;
			ubox.lines[uboxhdl].callernumber = "";
			ubox.lines[uboxhdl].dtmfkyes = "";
			ubox.lines[uboxhdl].lineid = ubox.linenum;
			ubox.lines[uboxhdl].state =  UBOX_STATE_IDLE;
			ubox.lines[uboxhdl].record = 0;
			ubox.lines[uboxhdl].productid = 0;	
			if(ubox.linenum == 1)
			{
			hdl = ubox.lines[uboxhdl].handle;     	
			}
			let msgs = {
				"event": "GetProductID",
				"handle": uboxhdl
				};
				
			// 	/*
			// 	如果失败， 在notify 消息中，会报错的
			// 	*/

				ws.send(JSON.stringify(msgs));
				console.log(outdata)
		}

		static InitWS()
		{
			
		
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
					store.commit('SET_HANDLEID',-1)
					LUbox.showStatus("websocket error:"+JSON.stringify(ev)); };
				ws.onclose =(ev)=> { 
					console.log(`onclose`)  
					LUbox.showStatus("websocket close:"+JSON.stringify(ev));  ws = null;};
				ws.onmessage = function(ev) {										
					let msg = eval('(' + ev.data + ')');						
					console.log(msg);
					if(msg.event =="plugin")
					{
						LUbox.Ubox_Plug_In(msg.handle);
					}else if(msg.event == "joined")
					{
						ubox.workpath = decodeURIComponent(msg.path);
					console.log("connect websocket ok")
					let msgs = {
					"event": "getinfo"			   
					};						   
						ws.send(JSON.stringify(msgs));
					}
					else if (msg.event=='getinfo')
					{						
						if(msg.channels.length > 0)
						{
							for(var i=0;i<msg.channels.length;i++)
							{	
								store.commit('SET_HANDLEID',msg.channels[i].handle)
								LUbox.Ubox_Plug_In(msg.channels[i].handle);
								if(msg.channels[i].deviceError)
								LUbox.ubox_DeviceError(msg.channels[i].handle);
								if(msg.channels[i].deviceAlarm)
								LUbox.ubox_DeviceAlarm(msg.channels[i].handle, msg.channels[i].deviceAlarm);
							}
						}
						else
						{
						store.commit('SET_HANDLEID',-1)
						console.log("no usb device  plugin");
						}
					} else if(msg.event == "answer")
				{
						if( msg.type == "GetProductID")
					{
						if(msg.result == "1")
						{
							console.log("USB设备是FI3102A");
							ubox.lines[msg.handle].productid = 1;				 
						}
						else if(msg.result == "2")
						{
							console.log("USB设备是FI3002B");	
							ubox.lines[msg.handle].productid = 2;					 
						}		
						else if(msg.result == "3")
						{
							console.log("USB设备是FI3001B");	
						ubox.lines[msg.handle].productid = 3;	
						console.log(ubox)					 
						}		
						else if(msg.result == "4")
						{
							console.log("USB设备是FI3101A");	
							ubox.lines[msg.handle].productid = 4;						 
						}	
					}
				}else if(msg.type)
				{
				store.commit('SET_TYPE',msg.type)				
				}
				else if(msg.event == "hookoff")
				{
					LUbox.Ubox_hookoff(msg.handle,msg.event);
					store.commit('SET_TYPE',msg.type)	
					if(msg.type == 6)
					{
					console.log("软件摘机，反向");
					}
					else if(msg.type == 7)
					{
					console.log("软件摘机，正向");
					}
					else
					{
					console.log("电话机摘机"); 
					}				
				}
				else if(msg.event=='callerId')//发现来电号码
				{
				store.commit('SET_EVENT',msg.event)		
				store.commit('SET_PHONENUMER',msg.callernumber)			
				}
				else if(msg.event=='hookup' || msg.event=='ringCancel')//挂机或者取消拨打
				{
				console.log('挂机了')
				LUbox.ubox_StopRecord();
				store.commit('SET_EVENT',msg.event)		
				store.commit('SET_PHONENUMER','')		
				store.commit('SET_NUMKEYS','')
				}
				else if(msg.event == 'dtmfdown')	
				{										
				store.commit('SET_NUMKEY', (msg.dtmfkey-48))								
				}else if(msg.event=='ring')
				{
				store.commit('SET_EVENT',msg.event)		
				}else if(msg.event=='ringCancel')
				{
				store.commit('SET_EVENT',msg.event)		
				}
					// if(msg.event == "plugin")
					// {
					//    Ubox_Plug_In(msg.handle);
					// }
					// if(msg.event == "plugin")
					// {
					// LUbox.Ubox_Plug_In(msg.handle);
					// }
					// if(msg.handle)
					// {
					// LUbox.Ubox_Plug_In(msg.handle);						
					// }
					// if(msg.type || msg.handle)
					// {
					// store.commit('SET_TYPE',msg.type)	
					// store.commit('SET_HANDLEID',msg.handle)
					// }
					// if(msg.handle)
					// {
					// store.commit('SET_HANDLEID',msg.handle)	
					// }
					// if(msg.event)//任何操作都返回
					// {	
					// store.commit('SET_EVENT',msg.event)	
					// }
					// if(msg.event=='callerId')//发现来电号码
					// {
					// store.commit('SET_PHONENUMER',msg.callernumber)			
					// }
					// if(msg.event=='hookup' || msg.event=='ringCancel')//挂机或者取消拨打
					// {
					// console.log('挂机了')
					// store.commit('SET_PHONENUMER','')		
					// store.commit('SET_NUMKEYS','')
					// }
					// if(msg.event == 'dtmfdown')	
					// {										
					// store.commit('SET_NUMKEY', (msg.dtmfkey-48))								
					// }
					
					

// LIm_UBOX.js?ac0b:48 {event: "notify", errorType: "SoftHookon", handle: -1, result: -3}
// LIm_UBOX.js?ac0b:81 {event: "SoftHookon", handle: -1}
// LIm_UBOX.js?ac0b:45 onmessage
// LIm_UBOX.js?ac0b:48 {event: "notify", errorType: "SoftHookon", handle: -1, result: -3}
// LIm_UBOX.js?ac0b:81 {event: "SoftHookon", handle: -1}
// LIm_UBOX.js?ac0b:45 onmessage
// LIm_UBOX.js?ac0b:48 {event: "notify", errorType: "SoftHookon", handle: -1, result: -3}
// LIm_UBOX.js?ac0b:81 {event: "SoftHookon", handle: -1}
// LIm_UBOX.js?ac0b:45 onmessage
// LIm_UBOX.js?ac0b:48 {event: "notify", errorType: "SoftHookon", handle: -1, result: -3}
// LIm_UBOX.js?ac0b:81 {event: "SoftHookon", handle: -1}
// LIm_UBOX.js?ac0b:45 onmessage
// LIm_UBOX.js?ac0b:48 {event: "notify", errorType: "SoftHookon", handle: -1, result: -3}
// LIm_UBOX.js?ac0b:81 {event: "SoftHookon", handle: -1}
// LIm_UBOX.js?ac0b:45 onmessage
					
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
		static ubox_RecordFile()
		{

			var curDate = new Date();
			var year = curDate.getFullYear();
			var month = curDate.getMonth()+1;
			var day = curDate.getDate();
			var hours= curDate.getHours();
			var minutes = curDate.getMinutes();
			var seconds = curDate.getSeconds();

			var rec_name = ubox.workpath+"ubox_record\\"+year+"-"+month+"-"+day+"-"+hours+"-"+minutes+"-"+seconds+".wav";
			//var rec_name = "E:\\usb\\gsm-usb\\bin\\ubox-record\\test.wav";
			console.log(rec_name)
			// AppendStatus(rec_name);
			//var msg = [];
			if(hdl != -1)
			{
				var msg = {
				"event": "RecordFile",
				"handle": hdl,
				"filename":rec_name,
				"codec":  CODER_PCM
				};
				console.log('开始录音')
				// AppendStatus("开始录音...")
				
				//如果失败， 在notify 消息中，会报错的
				
				LUbox.websocket_send_msg(JSON.stringify(msg));
			}
					

		}
		static websocket_send_msg(msg)
		{
			ws.send(msg);
		}
		
		static ubox_StopRecord()
		{
			if(hdl != -1)
			{
				var msg = {
				"event": "StopRecord",
				"handle": hdl
				};
			
				//  如果失败， 在notify 消息中，会报错的
				
				LUbox.websocket_send_msg(JSON.stringify(msg));
				console.log('已经停止录音');
				// AppendStatus("已经停止录音");
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