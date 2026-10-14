import { NextResponse } from "next/server";
import { applicationsStore } from "@/data/applications-store";

export async function GET() {
  try {
    const notifications = applicationsStore.getNotifications();
    const unreadCount = notifications.filter((n) => !n.isRead).length;
    return NextResponse.json({ notifications, unreadCount });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 });
  }
}

export async function PUT() {
  try {
    applicationsStore.markNotificationsAsRead();
    return NextResponse.json({ success: true, message: "All notifications marked as read" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to mark notifications as read" }, { status: 500 });
  }
}
