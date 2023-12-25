import { cn } from "@/lib/utils"
import { ExternalLink } from "lucide-react"

interface CustomLinkProps extends React.LinkHTMLAttributes<HTMLAnchorElement> {
  href: string
}

const CustomLink = ({
  href,
  children,
  className,
  ...rest
}: CustomLinkProps) => {
  const isInternalLink = href.startsWith("/")
  const isAnchorLink = href.startsWith("#")

  if (isInternalLink || isAnchorLink) {
    return (
      <a href={href} className={className} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("items-center underline", className)}
      {...rest}
    >
      {children}
      <ExternalLink className=" ml-0.5 h-4 w-4 inline-block" />
    </a>
  )
}

export default CustomLink
