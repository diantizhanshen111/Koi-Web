import { IModule, WKApp, MessageContentTypeConst, ChannelSettingRouteData, GroupRole, Row, ListItem, Section } from "@tsdaodao/base";
import { ChannelTypeGroup, WKSDK } from "wukongimjssdk";
import React from "react";
import ChannelManage from "./ChannelSetting/manage";
import { RouteContextConfig } from "@tsdaodao/base/src/Service/Context";



export default class GroupManagerModule implements IModule {
    id(): string {
        return "GroupManagerModule"
    }
    init(): void {
        console.log("【GroupManagerModule】初始化")

        // 群管理
        WKApp.shared.channelSettingRegister("channel.setting.groupmanager", (context) => {
            const data = context.routeData() as ChannelSettingRouteData
            const channelInfo = data.channelInfo
            const channel = data.channel
            if (channel.channelType !== ChannelTypeGroup) {
                return undefined
            }
            const rows = new Array()
            const subscriberOfMe = data.subscriberOfMe
            if (subscriberOfMe?.role === GroupRole.owner || subscriberOfMe?.role === GroupRole.manager) {
                rows.push(new Row({
                    cell: ListItem,
                    properties: {
                        title: "群管理",
                        onClick: () => {
                            context.push(<ChannelManage channel={channel} context={context}></ChannelManage>, new RouteContextConfig({
                                title: "群管理",
                            }))
                        }
                    },
                }))
            }
            if(rows.length === 0) {
                return undefined
            }
            return new Section({
                rows: rows,
            })
        },2000)
    }


}