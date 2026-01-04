"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/admin/data-table";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

interface PageData {
    id: string;
    title: string;
    slug: string;
    is_published: boolean;
    created_at: string;
}

export default function PagesPage() {
    const [data, setData] = useState<PageData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/Page")
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            });
    }, []);

    const columns: ColumnDef<PageData>[] = [
        {
            accessorKey: "title",
            header: "Başlık",
        },
        {
            accessorKey: "slug",
            header: "Slug",
        },
        {
            accessorKey: "is_published",
            header: "Durum",
            cell: ({ row }) => (
                <Badge variant={row.original.is_published ? "default" : "secondary"}>
                    {row.original.is_published ? "Yayında" : "Taslak"}
                </Badge>
            ),
        },
        {
            accessorKey: "created_at",
            header: "Oluşturulma",
            cell: ({ row }) => format(new Date(row.original.created_at), "d MMMM yyyy", { locale: tr }),
        },
        {
            id: "actions",
            header: "İşlemler",
            cell: ({ row }) => (
                <Button asChild variant="ghost" size="sm">
                    <Link href={`/admin/pages/${row.original.id}`}>Düzenle</Link>
                </Button>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Sayfalar</h1>
                    <p className="text-muted-foreground">Sitenizdeki statik sayfaları yönetin.</p>
                </div>
                <Button asChild>
                    <Link href="/admin/pages/new">
                        <Plus className="mr-2 h-4 w-4" /> Yeni Sayfa
                    </Link>
                </Button>
            </div>
            <DataTable columns={columns} data={data} searchKey="title" />
        </div>
    );
}
