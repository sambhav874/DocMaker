'use client'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { faBoxArchive } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InboxNotification, InboxNotificationList, LiveblocksUIConfig } from "@liveblocks/react-ui";
import { useInboxNotifications, useUnreadInboxNotificationsCount } from "@liveblocks/react/suspense";
import Image from "next/image";
import { ReactNode } from "react";

const Notification = () => {

    const { inboxNotifications } = useInboxNotifications();
    const { count } = useUnreadInboxNotificationsCount();

    const unreadNotifications = inboxNotifications.filter((notification) => !notification.readAt);

    return (
        <Popover>
            <PopoverTrigger className="flex items-center justify-center space-x-1 p-2 text-white duration-300 bg-dark-300 hover:bg-white hover:text-dark-200">
                <FontAwesomeIcon icon={faBoxArchive} className="h-4 w-4 text-xl font-light hover:text-dark-200 px-2" />
                {count > 0 && (
                    <span className="bg-red-500 rounded-full text-white p-1 text-xs">{count}</span>
                )}
            </PopoverTrigger>
            <PopoverContent align="end">
                <LiveblocksUIConfig overrides={{
                    INBOX_NOTIFICATION_TEXT_MENTION: (user: ReactNode) => (
                        <>{user} mentioned you.</>
                    )
                }}>
                    <InboxNotificationList>
                        {unreadNotifications.length <= 0 && (
                            <p className="py-2 text-center text-dark-500">No new notifications.</p>
                        )}
                        {unreadNotifications.length > 0 && unreadNotifications.map(
                            (notification) => (
                                <InboxNotification
                                    key={notification.id}
                                    inboxNotification={notification}
                                    className="bg-dark-200 text-white"
                                    href={`/documents/${notification.roomId}`}
                                    showActions={false}
                                    kinds={{
                                        thread: (props) => (
                                            <InboxNotification.Thread {...props} showActions={false} showRoomName={false} />
                                        ),
                                        textMention: (props) => (
                                            <InboxNotification.TextMention {...props} showRoomName={false} />
                                        ),
                                        $documentAccess: (props) => (
                                            <InboxNotification.Custom
                                                {...props}
                                                title={props.inboxNotification.activities[0].data.title as String}
                                                aside={
                                                    <InboxNotification.Icon className="bg-transparent">
                                                        <Image src={props.inboxNotification.activities[0].data.avatar as string || ''} width={36} height={36} alt="avatar" className="rounded-full" />
                                                        </InboxNotification.Icon>}>
                                                        {props.children}
                                                
                                            </InboxNotification.Custom>
                                        )
                                    }}
                                />
                            )
                        )}
                    </InboxNotificationList>
                </LiveblocksUIConfig>
            </PopoverContent>
        </Popover>
    )
}

export default Notification;
