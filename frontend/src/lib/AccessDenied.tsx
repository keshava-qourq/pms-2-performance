import * as React from "react";

import { Button } from "@/lib/ui";

/**
 * The one "Access denied" experience the whole app shows: for a 403 from any API call (wired
 * through apiFetch -> onForbidden) and for a route guard redirect (via the message prop). Never
 * build a second denial screen per feature -- route every 403 and every blocked route here.
 */
export function AccessDenied({
  message,
  onDismiss,
}: {
  message?: string;
  onDismiss?: () => void;
}) {
  return (
    <div
      role="alert"
      className="m-6 flex flex-col items-start gap-2 rounded-[var(--brand-radius)] border px-5 py-4"
      style={{
        borderColor: "var(--brand-border)",
        backgroundColor: "var(--brand-surface)",
        color: "var(--brand-fg)",
      }}
    >
      <p className="text-base font-semibold">Access denied</p>
      <p className="text-sm" style={{ color: "var(--brand-fg-muted)" }}>
        {message ?? "You do not have permission to view this."}
      </p>
      {onDismiss ? (
        <Button type="button" variant="secondary" size="sm" onClick={onDismiss}>
          Dismiss
        </Button>
      ) : null}
    </div>
  );
}
