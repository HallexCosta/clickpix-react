import { memo } from 'react'
import { createPortal } from 'react-dom'
import { ClickPixButton } from '../../checkout/components/ClickPixButton'

export type RenderClickPixButton = {
  productId: string
  htmlClickPix: HTMLDivElement
  isProductIdRepeated: boolean
}

export const RenderClickPixButtons = memo(
  ({
    allClickPix
  }: {
    allClickPix: RenderClickPixButton[]
  }) => {
    return Array.from(
      allClickPix,
      ({ htmlClickPix, productId, isProductIdRepeated }) => {
        return createPortal(
          <ClickPixButton
            productId={productId}
            isProductIdRepeated={isProductIdRepeated}
          />,
          htmlClickPix
        )
      }
    )
  }
)
RenderClickPixButtons.displayName = 'RenderClickPixButtons'
