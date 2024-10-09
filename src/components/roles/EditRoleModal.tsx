import { TPermission, TRole } from '@/interface/auth.interface'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import { Switch } from '../ui/switch'
import { Textarea } from '../ui/textarea'

type TProps = {
    editData: TRole | null,
    setOpen: React.Dispatch<React.SetStateAction<null | TRole>>
}

const EditRoleModal = ({ editData, setOpen }: TProps) => {

    const [description, setDescription] = useState<string | undefined>(editData?.description)

    return (
        <div>
            <Dialog open={editData !== null} onOpenChange={() => setOpen(null)}>
                <DialogContent className='max-w-[50vw]'>
                    <DialogTitle>
                        Edit Role
                    </DialogTitle>
                    <div className='flex flex-col gap-2'>
                        <label className='text-black font-semibold text-base'>Description:</label>
                        <Textarea className='min-h-40' value={description} defaultValue={editData?.description} onChange={(e) => setDescription(e.target.value)} />
                    </div>

                    <div>
                        <h3 className='text-black font-semibold text-base'>Permissions:</h3>
                        <div className='pt-2 grid lg:grid-cols-3 gap-2'>
                            {
                                editData?.permissions.map((permission: TPermission) => <div className='p-3 rounded-md bg-background' key={permission.feature}>
                                    <h4 className='capitalize border-b border-border-color pb-2 mb-3 font-semibold'>{permission.feature}</h4>
                                    <div>
                                        {
                                            Object.entries(permission.access).map((acc: [string, boolean]) => {
                                                console.log(acc)
                                                return <div key={acc[0]} className='flex items-center justify-between'>
                                                    <span className='text-gray'>{acc[0]}</span> : <Switch checked={acc[1] === true} />
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>)
                            }
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditRoleModal