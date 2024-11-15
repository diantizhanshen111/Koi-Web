import { MessageContent } from "wukongimjssdk";
import { WKRTCCallType } from "../P2pcall/signalingChannel";
import { MessageBase, MessageCell } from "@tsdaodao/base";
import React from "react";
import MessageHead from "@tsdaodao/base/src/Messages/Base/head";
import "./system.css";
export class CallSystemContent extends MessageContent {
    constructor(contentType) {
        super();
        this.second = 0; // 通话时长，单位秒
        this.callType = WKRTCCallType.Audio; // 呼叫类型
        this.isAnswered = false; // 是否接听
        this.contentType = contentType;
    }
    encodeJSON() {
        return {
            content: this.content,
            second: this.second,
            call_Type: this.callType,
            result_type: this.isAnswered ? 1 : 0
        };
    }
    decodeJSON(content) {
        this.content = content["content"];
        this.second = content["second"];
        this.callType = content["call_type"];
        this.isAnswered = content["is_answered"] == 1;
    }
    get conversationDigest() {
        if (this.callType == WKRTCCallType.Audio) {
            return "[语音通话]";
        }
        return "[视频通话]";
    }
}
export class CallSystemCell extends MessageCell {
    render() {
        const { message, context } = this.props;
        let content = message.content;
        return (React.createElement(MessageBase, { message: message, context: context },
            React.createElement(MessageHead, { message: message }),
            React.createElement("div", { className: "wk-message-callsystem" },
                !message.send ? React.createElement("img", { className: "wk-callsystem-icon", src: content.callType == WKRTCCallType.Video ? require("../assets/icon_received_video_chat.png") : require("../assets/icon_voice_chat.png"), style: { width: "24px", height: "24px" } }) : null,
                React.createElement("div", { className: "wk-callsystem-content" }, content.content),
                message.send ? React.createElement("img", { className: "wk-callsystem-icon", src: content.callType == WKRTCCallType.Video ? require("../assets/icon_send_video_chat.png") : require("../assets/icon_voice_chat.png"), style: { width: "24px", height: "24px" } }) : null)));
    }
}
