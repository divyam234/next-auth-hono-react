import CustomLink from "./custom-link"
import React from "react"
import { Button } from "./ui/button"

export function MainNav() {
  return (
    <div className="flex items-center space-x-2 lg:space-x-6 gap-8">
      <CustomLink href="/">
        <Button variant="ghost" className="p-0">
          <img src="/logo.png" alt="Home" width="32" height="32" />
        </Button>
      </CustomLink>
      <CustomLink  href="/api/protected">
       Protected Api Route
      </CustomLink>
    </div>
  )
}

