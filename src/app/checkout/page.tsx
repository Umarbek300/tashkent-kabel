import { getSettings } from "@/lib/catalog";
import { isCardConfigured } from "@/lib/payments";
import { CheckoutForm } from "@/components/CheckoutForm";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const settings = await getSettings();

  return (
    <CheckoutForm
      deliveryFee={Number(settings.deliveryFee ?? 0) || 0}
      freeDeliveryFrom={Number(settings.freeDeliveryFrom ?? 0) || 0}
      cardAvailable={isCardConfigured(settings)}
    />
  );
}
