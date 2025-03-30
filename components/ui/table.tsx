"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface TableProps extends React.ComponentProps<"table"> {
	variant?: "default" | "modern" | "comparison" | "spec";
}

function Table({ className, variant = "default", ...props }: TableProps) {
	return (
		<div
			data-slot="table-container"
			className={cn(
				"relative w-full overflow-x-auto",
				variant === "comparison" && "bg-black text-white py-4",
				variant === "spec" && "bg-card rounded-lg"
			)}
		>
			<table
				data-slot="table"
				className={cn(
					"w-full caption-bottom text-sm",
					variant === "modern" && "border-collapse",
					variant === "comparison" && "border-collapse",
					variant === "spec" && "border-collapse bg-transparent",
					className
				)}
				{...props}
			/>
		</div>
	);
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
	return (
		<thead
			data-slot="table-header"
			className={cn("[&_tr]:border-b", className)}
			{...props}
		/>
	);
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
	return (
		<tbody
			data-slot="table-body"
			className={cn("[&_tr:last-child]:border-0", className)}
			{...props}
		/>
	);
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
	return (
		<tfoot
			data-slot="table-footer"
			className={cn(
				"bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
				className
			)}
			{...props}
		/>
	);
}

interface TableRowProps extends React.ComponentProps<"tr"> {
	variant?: "default" | "spec" | "transparent";
}

function TableRow({ className, variant = "default", ...props }: TableRowProps) {
	return (
		<tr
			data-slot="table-row"
			className={cn(
				variant === "default" &&
					"hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
				variant === "spec" && "border-t border-gray-800 py-4",
				variant === "transparent" && "border-none hover:bg-transparent",
				className
			)}
			{...props}
		/>
	);
}

interface TableHeadProps extends React.ComponentProps<"th"> {
	variant?: "default" | "modern" | "transparent";
}

function TableHead({
	className,
	variant = "default",
	...props
}: TableHeadProps) {
	return (
		<th
			data-slot="table-head"
			className={cn(
				variant === "default" &&
					"text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
				variant === "modern" &&
					"text-gray-400 text-sm font-normal py-3 px-4 text-left",
				variant === "transparent" &&
					"text-gray-400 text-sm font-normal py-2 px-0 text-left border-0",
				className
			)}
			{...props}
		/>
	);
}

interface TableCellProps extends React.ComponentProps<"td"> {
	variant?: "default" | "modern" | "transparent" | "label" | "value";
}

function TableCell({
	className,
	variant = "default",
	...props
}: TableCellProps) {
	return (
		<td
			data-slot="table-cell"
			className={cn(
				variant === "default" &&
					"p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
				variant === "modern" && "py-3 px-4 align-middle",
				variant === "transparent" && "py-2 px-0 align-middle border-0",
				variant === "label" && "text-sm text-gray-400 pb-1 pt-4",
				variant === "value" && "pb-4 pt-0 text-base font-medium",
				className
			)}
			{...props}
		/>
	);
}

function TableCaption({
	className,
	...props
}: React.ComponentProps<"caption">) {
	return (
		<caption
			data-slot="table-caption"
			className={cn("text-muted-foreground mt-4 text-sm", className)}
			{...props}
		/>
	);
}

// เพิ่ม component สำหรับสเปครถยนต์
function SpecTable({
	className,
	children,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div className={cn("flex flex-col space-y-6", className)} {...props}>
			{children}
		</div>
	);
}

function SpecItem({
	label,
	value,
	className,
}: {
	label: React.ReactNode;
	value: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={cn("space-y-1", className)}>
			<div className="text-sm text-gray-400">{label}</div>
			<div className="font-medium">{value}</div>
		</div>
	);
}

function SpecDivider({ className }: { className?: string }) {
	return <div className={cn("border-t border-gray-800 my-4", className)}></div>;
}

export {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableHead,
	TableRow,
	TableCell,
	TableCaption,
	SpecTable,
	SpecItem,
	SpecDivider,
};
