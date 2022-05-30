const hdl = -1 // 不等于负一才会拨打send
const ubox = { // 全局声明
  lines: [],
  linenum: 0
}

// 判断接受消息的状态
ws.onmessage = function(ev) {
  // console.log(ev);
  AppendStatus(ev.data)
  var msg = eval('(' + ev.data + ')')
  // AppendStatus("json:"+msg.event);
  if (msg.event === 'plugin') {
    Ubox_Plug_In(msg.handle)
  } else if (msg.event === 'hookoff') {
    Ubox_hookoff(msg.handle)
    if (msg.type === 6) {
      AppendStatus('软件摘机，反向')
    } else if (msg.type === 7) {
      AppendStatus('软件摘机，正向')
    } else {
      AppendStatus('电话机摘机')
    }
  } else if (msg.event === 'hookup') {
    Ubox_hookon(msg.handle)
  } else if (msg.event === 'ring') {
    ubox_Ring(msg.handle)
  } else if (msg.event === 'hang') {
    ubox_HangIng(msg.handle)
  } else if (msg.event === 'callerId') {
    Ubox_CallId(msg.handle, msg.callernumber)
  } else if (msg.event === 'dtmfdown') {
    ubox_DtmfKey(msg.handle, msg.dtmfkey)
  } else if (msg.event === 'deviceAlarm') {
    ubox_DeviceAlarm(msg.handle, msg.type)
  } else if (msg.event === 'ringCancel') {
    ubox_RingCancel(msg.handle)
  } else if (msg.event === 'voltage') {
    ubox_LineVoltage(msg.handle, msg.vol)
  } else if (msg.event === 'deviceError') {
    ubox_DeviceError(msg.handle)
  } else if (msg.event === 'playEnd') {
    ubox_PlayEnd(msg.handle)
  } else if (msg.event === 'playError') {
    AppendStatus('放音失败， handle:' + msg.handle)
  } else if (msg.event === 'busyTone') {
    ubox_ToneBusy(msg.handle)
  } else if (msg.event === 'CallOutFinish') {
    AppendStatus('软件拨号完成 handle:' + msg.handle)
  } else if (msg.event === 'plugout') {
    ubox_PlugOut(msg.handle)
  } else if (msg.event === 'joined') {
    AppendStatus('connect websocket ok')
    // var msg = '{"event": "getinfo"}';
    // websocket_send_msg(msg);
    // var msg = [];
    var msg = {
      'event': 'getinfo'

    }
    // var msg = '{"event": "RecordFile",';
    // msg +='"handle":'+hdl;
    websocket_send_msg(JSON.stringify(msg))
  } else if (msg.event === 'left') {
    AppendStatus('disconnect websocket ok')
  } else if (msg.event === 'getinfo') {
    if (msg.channels.length > 0) {
      for (var i = 0; i < msg.channels.length; i++) {
        Ubox_Plug_In(msg.channels[i].handle)
        if (msg.channels[i].deviceError) { ubox_DeviceError(msg.channels[i].handle) }
        if (msg.channels[i].deviceAlarm) { ubox_DeviceAlarm(msg.channels[i].handle, msg.channels[i].deviceAlarm) }
      }
    } else {
      AppendStatus('no usb device  plugin')
    }
  } else if (msg.event === 'notify') {
    AppendStatus(msg.errorType + ' handle:' + msg.handle + ' ' + Get_Error(msg.result))
  } else if (msg.event === 'answer') {
    if (msg.type === 'GetDeviceVersionNum') {
      AppendStatus('handle:' + msg.handle + ' 硬件版本号：' + msg.result)
    } else if (msg.type === 'GetUsernum') {
      AppendStatus('handle:' + msg.handle + ' 用户号:' + msg.result)
    } else if (msg.type === 'GetProductID') {
      if (msg.result === '1') {
        AppendStatus('USB设备是FI3102A')
        ubox.lines[msg.handle].productid = 1
      } else if (msg.result === '2') {
        AppendStatus('USB设备是FI3002B')
        ubox.lines[msg.handle].productid = 2
      } else if (msg.result === '3') {
        AppendStatus('USB设备是FI3001B')
        ubox.lines[msg.handle].productid = 3
      } else if (msg.result === '4') {
        AppendStatus('USB设备是FI3101A')
        ubox.lines[msg.handle].productid = 4
      }
    }
  } else if (msg.event === 'systeminfo') {
    for (var i = 0; i < msg.macs.length; i++) {
      AppendStatus('mac name:' + msg.macs[i].macname)
      AppendStatus('mac des:' + msg.macs[i].macdes)
      AppendStatus('mac address:' + msg.macs[i].macaddr)
      for (var j = 0; j < msg.macs[i].ips.length; j++) { AppendStatus('ip address:' + msg.macs[i].ips[j].ipaddr) }
    }
    /* AppendStatus("total memory:"+msg.memory.totalmem);
    AppendStatus("free memory:"+msg.memory.freemem);
    AppendStatus("virtual memory:"+msg.memory.virtualmem);
    AppendStatus("disk SerialNo:"+msg.diskSerialNo);
    AppendStatus("cpu SerialNo:"+msg.cpuSerialNo);
      for(var i=0;i<msg.disks.length;i++)
    {
         AppendStatus("disk id:"+msg.disks[i].id);
          AppendStatus("disk total:"+msg.disks[i].total);
          AppendStatus("disk free:"+msg.disks[i].free);

    }*/
  } else if (msg.event === 'uploadfileresult') {
    AppendStatus(' UploadFormFile result:' + msg.result)
  }
}
