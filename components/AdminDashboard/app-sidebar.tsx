"use client";

import * as React from "react";
import {
	AudioWaveform,
	BookOpen,
	Bot,
	Command,
	Frame,
	GalleryVerticalEnd,
	Map,
	PieChart,
	Settings2,
	SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/AdminDashboard/nav-main";
import { NavProjects } from "@/components/AdminDashboard/nav-projects";
import { NavUser } from "@/components/AdminDashboard/nav-user";
import { TeamSwitcher } from "@/components/AdminDashboard/team-switcher";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";

// BYD Admin Dashboard data
const data = {
	user: {
		name: "BYD Admin",
		email: "admin@bydmetromobile.com",
		avatar: "/images/metromobile-logo.png",
	},
	teams: [
		{
			name: "BYD Metromobile",
			logo: GalleryVerticalEnd,
			plan: "Admin Panel",
		},
	],
	navMain: [
		{
			title: "Dashboard",
			url: "/admin",
			icon: SquareTerminal,
			isActive: true,
			items: [
				{
					title: "Overview",
					url: "/admin",
				},
				{
					title: "Analytics",
					url: "/admin/analytics",
				},
			],
		},
		{
			title: "รุ่นรถยนต์",
			url: "/admin/models",
			icon: Bot,
			items: [
				{
					title: "จัดการรถยนต์",
					url: "/admin/models",
				},
				{
					title: "เพิ่มรุ่นใหม่",
					url: "/admin/models/new",
				},
				{
					title: "หมวดหมู่",
					url: "/admin/models/categories",
				},
			],
		},
		{
			title: "โปรโมชั่น",
			url: "/admin/promotions",
			icon: BookOpen,
			items: [
				{
					title: "จัดการโปรโมชั่น",
					url: "/admin/promotions",
				},
				{
					title: "สร้างโปรโมชั่นใหม่",
					url: "/admin/promotions/new",
				},
				{
					title: "โปรโมชั่นที่หมดอายุ",
					url: "/admin/promotions/expired",
				},
			],
		},
		{
			title: "ไฟล์และสื่อ",
			url: "/admin/files",
			icon: Settings2,
			items: [
				{
					title: "จัดการไฟล์",
					url: "/admin/files",
				},
				{
					title: "อัปโหลดไฟล์",
					url: "/admin/files/upload",
				},
				{
					title: "หมวดหมู่ไฟล์",
					url: "/admin/files/categories",
				},
			],
		},
	],
	projects: [
		{
			name: "Website Analytics",
			url: "/admin/analytics",
			icon: Frame,
		},
		{
			name: "User Management",
			url: "/admin/users",
			icon: PieChart,
		},
		{
			name: "System Settings",
			url: "/admin/settings",
			icon: Map,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={data.teams} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavProjects projects={data.projects} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
