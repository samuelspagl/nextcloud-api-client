interface OcsMeta{
    status: string
    statuscode: number
    message?: string
    totalitems?: string
    itemsperpage?: string
}

interface OcsBaseResponse<T>{
    ocs:{
        meta: OcsMeta
        data: T
    }
}

type EmptyOcsResponse = OcsBaseResponse<[]>