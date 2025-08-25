"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/* ------------------------------
   Base Card Components
--------------------------------*/
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

/* ------------------------------
   PropertyCard Component
--------------------------------*/
interface Property {
  id: number
  title?: string
  address?: string
  city?: string
  state?: string
  country?: string
  beds?: number | null
  baths?: number | null
  pricePerMonth?: number | null
  squareFeet?: number | null
  imageUrl?: string
}

export function PropertyCard({ property }: { property: Property }) {
  const {
    title,
    address,
    city,
    state,
    country,
    beds,
    baths,
    pricePerMonth,
    squareFeet,
    imageUrl,
  } = property

  return (
    <Card className="overflow-hidden">
      {/* Image */}
      <div className="h-48 w-full bg-gray-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title ?? "Property"}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Header */}
      <CardHeader>
        <CardTitle>{title ?? "Untitled Property"}</CardTitle>
        <CardDescription>
          {address
            ? `${address}, ${city ?? ""} ${state ?? ""}, ${country ?? ""}`
            : "No address available"}
        </CardDescription>
      </CardHeader>

      {/* Content */}
      <CardContent>
        <p>
          <strong>Price:</strong>{" "}
          {typeof pricePerMonth === "number"
            ? `$${pricePerMonth.toFixed(2)} / month`
            : "N/A"}
        </p>
        <p>
          <strong>Beds:</strong> {beds ?? "N/A"}
        </p>
        <p>
          <strong>Baths:</strong> {baths ?? "N/A"}
        </p>
        <p>
          <strong>Size:</strong>{" "}
          {typeof squareFeet === "number"
            ? `${squareFeet.toLocaleString()} sq ft`
            : "N/A"}
        </p>
      </CardContent>

      {/* Footer */}
      <CardFooter>
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          View Details
        </button>
      </CardFooter>
    </Card>
  )
}

/* ------------------------------
   Export Base Components
--------------------------------*/
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
