import * as React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { apiFetch, ApiError } from "@/lib/api";

const { Button, Input, Label, Select, Table, THead, TBody, TR, TH, TD, Empty } = UI;
const { Plus, Edit } = Icons;

const PAGE_SIZE = 25;

type Role = "employee" | "manager" | "hr_admin";

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: Role;
  manager_id: string | null;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
}

interface ListResponse {
  items: Employee[];
  total: number;
  page: number;
  page_size: number;
}

interface EmployeeFormValues {
  name: string;
  email: string;
  role: Role;
  manager_id: string;
}

const ROLE_OPTIONS: Array<{ value: Role; label: string }> = [
  { value: "employee", label: "Employee" },
  { value: "manager", label: "Manager" },
  { value: "hr_admin", label: "HR Admin" },
];

function roleLabel(role: Role): string {
  return ROLE_OPTIONS.find((r) => r.value === role)?.label ?? role;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Maps a thrown ApiError onto the form: 409 and 422 go on the field they belong
 * to via `setFieldError`; anything else (403, 404, network) comes back as a
 * string for a form-level banner.
 */
function applyServerError(
  err: unknown,
  setFieldError: (field: keyof EmployeeFormValues, message: string) => void,
): string | null {
  if (!(err instanceof ApiError)) {
    return err instanceof Error ? err.message : "Something went wrong. Try again.";
  }
  if (err.status === 409) {
    setFieldError("email", "Email already in use");
    return null;
  }
  if (err.status === 422) {
    const detail = err.detail as unknown;
    if (Array.isArray(detail)) {
      let applied = false;
      for (const item of detail as Array<{ loc?: unknown[]; msg?: string }>) {
        const loc = Array.isArray(item?.loc) ? item.loc : [];
        const field = loc[loc.length - 1];
        if (
          (field === "name" || field === "email" || field === "role" || field === "manager_id") &&
          item.msg
        ) {
          setFieldError(field, item.msg);
          applied = true;
        }
      }
      if (applied) return null;
    }
    return typeof detail === "string" ? detail : "Please check the highlighted fields.";
  }
  if (err.status === 403) return "Access denied";
  if (err.status === 404) return "Employee not found";
  return err.message || "Something went wrong. Try again.";
}

function EmployeeForm({
  mode,
  employee,
  managerOptions,
  onSuccess,
  onCancel,
}: {
  mode: "create" | "edit";
  employee: Employee | null;
  managerOptions: Employee[];
  onSuccess: (employee: Employee) => void;
  onCancel: () => void;
}) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, dirtyFields },
  } = useForm<EmployeeFormValues>({
    defaultValues: {
      name: employee?.name ?? "",
      email: employee?.email ?? "",
      role: employee?.role ?? "employee",
      manager_id: employee?.manager_id ?? "",
    },
  });
  const [formError, setFormError] = React.useState<string | null>(null);

  const setFieldError = (field: keyof EmployeeFormValues, message: string) =>
    setError(field, { type: "server", message });

  const onSubmit: SubmitHandler<EmployeeFormValues> = async (values) => {
    setFormError(null);
    try {
      if (mode === "create") {
        const created = await apiFetch<Employee>("/admin/employees", {
          method: "POST",
          body: JSON.stringify({
            name: values.name.trim(),
            email: values.email.trim(),
            role: values.role,
            manager_id: values.manager_id || null,
          }),
        });
        onSuccess(created);
        return;
      }

      if (!employee) return;
      const patch: Record<string, unknown> = {};
      if (dirtyFields.name) patch.name = values.name.trim();
      if (dirtyFields.email) patch.email = values.email.trim();
      if (dirtyFields.role) patch.role = values.role;
      if (dirtyFields.manager_id) patch.manager_id = values.manager_id || null;

      if (Object.keys(patch).length === 0) {
        onCancel();
        return;
      }
      const updated = await apiFetch<Employee>(`/admin/employees/${employee.id}`, {
        method: "PATCH",
        body: JSON.stringify(patch),
      });
      onSuccess(updated);
    } catch (err) {
      const message = applyServerError(err, setFieldError);
      if (message) setFormError(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label={mode === "create" ? "Add employee" : "Edit employee"}
      className="flex flex-col gap-4"
    >
      {formError ? (
        <p role="alert" className="text-sm" style={{ color: "#cc8a76" }}>
          {formError}
        </p>
      ) : null}

      <div>
        <Label htmlFor="employee-name">Full name</Label>
        <Input
          id="employee-name"
          className="mt-1"
          {...register("name", { required: "Enter the employee's full name." })}
        />
        {errors.name ? (
          <p role="alert" className="mt-1 text-xs" style={{ color: "#cc8a76" }}>
            {errors.name.message}
          </p>
        ) : null}
      </div>

      <div>
        <Label htmlFor="employee-email">Work email</Label>
        <Input
          id="employee-email"
          type="email"
          className="mt-1"
          {...register("email", {
            required: "Enter a work email address.",
            pattern: { value: EMAIL_PATTERN, message: "Enter a valid email address." },
          })}
        />
        {errors.email ? (
          <p role="alert" className="mt-1 text-xs" style={{ color: "#cc8a76" }}>
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div>
        <Label htmlFor="employee-role">Role</Label>
        <Select
          id="employee-role"
          className="mt-1"
          {...register("role", { required: "Choose a role." })}
        >
          {ROLE_OPTIONS.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </Select>
        {errors.role ? (
          <p role="alert" className="mt-1 text-xs" style={{ color: "#cc8a76" }}>
            {errors.role.message}
          </p>
        ) : null}
      </div>

      <div>
        <Label htmlFor="employee-manager">Manager</Label>
        <Select id="employee-manager" className="mt-1" {...register("manager_id")}>
          <option value="">No manager</option>
          {managerOptions
            .filter((m) => m.id !== employee?.id)
            .map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.email})
              </option>
            ))}
        </Select>
      </div>

      <div className="flex gap-2 pt-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : mode === "create" ? "Add employee" : "Save changes"}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default function Screen() {
  const [search, setSearch] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [items, setItems] = React.useState<Employee[]>([]);
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [loadError, setLoadError] = React.useState<string | null>(null);
  const [refreshKey, setRefreshKey] = React.useState(0);
  const [panel, setPanel] = React.useState<{
    mode: "closed" | "create" | "edit";
    id: string | null;
  }>({ mode: "closed", id: null });

  React.useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [search]);

  React.useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setLoadError(null);
    const params = new URLSearchParams({
      search: debouncedSearch,
      page: String(page),
      page_size: String(PAGE_SIZE),
    });
    apiFetch<ListResponse>(`/admin/employees?${params.toString()}`)
      .then((data) => {
        if (cancelled) return;
        setItems(data.items);
        setTotal(data.total);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setLoadError(err instanceof Error ? err.message : "We could not load the directory.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [debouncedSearch, page, refreshKey]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const managerOptions = items.filter((e) => e.role === "manager" || e.role === "hr_admin");
  const editing = panel.mode === "edit" ? (items.find((e) => e.id === panel.id) ?? null) : null;

  const managerNameFor = (id: string | null) => {
    if (!id) return "—";
    const found = items.find((e) => e.id === id);
    return found ? found.name : id;
  };

  const handleCreated = (created: Employee) => {
    setItems((prev) => [created, ...prev]);
    setTotal((t) => t + 1);
    setPanel({ mode: "closed", id: null });
  };

  const handleUpdated = (updated: Employee) => {
    setItems((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
    setPanel({ mode: "closed", id: null });
  };

  return (
    <div
      style={{
        color: brand.primaryColor,
        fontFamily: brand.fontBody,
        backgroundColor: brand.backgroundColor,
      }}
      className="min-h-full px-6 py-10 sm:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl" style={{ fontFamily: brand.fontHeading }}>
              Employee directory
            </h1>
            <p className="mt-2 text-sm" style={{ color: brand.neutralColor }}>
              {total} {total === 1 ? "employee" : "employees"} on record.
            </p>
          </div>
          <Button
            type="button"
            onClick={() => setPanel({ mode: "create", id: null })}
            className="inline-flex items-center gap-2"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            New employee
          </Button>
        </header>

        <div className="mt-6 max-w-sm">
          <Label htmlFor="employee-search">Search</Label>
          <Input
            id="employee-search"
            type="search"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-1"
          />
        </div>

        {panel.mode !== "closed" ? (
          <div
            className="mt-6 max-w-lg rounded-[var(--brand-radius)] border p-5"
            style={{
              borderColor: "rgba(233,237,233,0.12)",
              backgroundColor: "rgba(233,237,233,0.04)",
            }}
          >
            <h2 className="text-lg" style={{ fontFamily: brand.fontHeading }}>
              {panel.mode === "create" ? "Add employee" : `Edit ${editing?.name ?? ""}`}
            </h2>
            <div className="mt-4">
              <EmployeeForm
                mode={panel.mode}
                employee={editing}
                managerOptions={managerOptions}
                onSuccess={panel.mode === "create" ? handleCreated : handleUpdated}
                onCancel={() => setPanel({ mode: "closed", id: null })}
              />
            </div>
          </div>
        ) : null}

        <div className="mt-8">
          {loading ? (
            <p
              role="status"
              aria-live="polite"
              className="text-sm"
              style={{ color: brand.neutralColor }}
            >
              Loading employees…
            </p>
          ) : loadError ? (
            <div className="flex flex-col items-start gap-3">
              <p role="alert" className="text-sm" style={{ color: "#cc8a76" }}>
                {loadError}
              </p>
              <Button type="button" variant="secondary" onClick={() => setRefreshKey((k) => k + 1)}>
                Try again
              </Button>
            </div>
          ) : items.length === 0 ? (
            <Empty
              title="No employees found"
              description={
                debouncedSearch
                  ? "No one matches that search. Try a different name or email."
                  : "Add your first employee to get started."
              }
            />
          ) : (
            <>
              <Table>
                <THead>
                  <TR>
                    <TH scope="col">Name</TH>
                    <TH scope="col">Email</TH>
                    <TH scope="col">Role</TH>
                    <TH scope="col">Manager</TH>
                    <TH scope="col">Status</TH>
                    <TH scope="col">
                      <span className="sr-only">Actions</span>
                    </TH>
                  </TR>
                </THead>
                <TBody>
                  {items.map((e) => (
                    <TR key={e.id}>
                      <TD>{e.name}</TD>
                      <TD>{e.email}</TD>
                      <TD>{roleLabel(e.role)}</TD>
                      <TD>{managerNameFor(e.manager_id)}</TD>
                      <TD>{e.status}</TD>
                      <TD>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setPanel({ mode: "edit", id: e.id })}
                          aria-label={`Edit ${e.name}`}
                        >
                          <Edit className="h-4 w-4" aria-hidden="true" />
                        </Button>
                      </TD>
                    </TR>
                  ))}
                </TBody>
              </Table>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs" style={{ color: brand.neutralColor }}>
                  Page {page} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    Previous
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
