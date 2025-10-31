import {parseAsInteger, parseAsString } from "nuqs/server"
import{PAGINATION} from "@/config/constants"
import { parse } from "path"
import page from "@/app/(auth)/login/page"
import { se } from "date-fns/locale"


export const workflowParams={
page:parseAsInteger
.withDefault(PAGINATION.DEFAULT_PAGE)
.withOptions({clearOnDefault:true}),

pageSize:parseAsInteger
.withDefault(PAGINATION.DEFAULT_PAGE_SIZE)
.withOptions({clearOnDefault:true}),

search:parseAsString
.withDefault("")
.withOptions({clearOnDefault:true}),


}