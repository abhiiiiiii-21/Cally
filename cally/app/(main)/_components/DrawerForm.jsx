import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import React from 'react'

const DrawerForm = () => {
    return (
        <div>
            <div className="w-full max-w-md">
                <form>
                    <FieldGroup>
                        <FieldSet>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                                        Name on Card
                                    </FieldLabel>
                                    <Input
                                        id="checkout-7j9-card-name-43j"
                                        placeholder="Evil Rabbit"
                                        required
                                    />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                                        Card Number
                                    </FieldLabel>
                                    <Input
                                        id="checkout-7j9-card-number-uw1"
                                        placeholder="1234 5678 9012 3456"
                                        required
                                    />
                                    <FieldDescription>
                                        Enter your 16-digit card number
                                    </FieldDescription>
                                </Field>
                             
                            </FieldGroup>
                        </FieldSet>
                        <Field orientation="horizontal">
                            <Button type="submit">Submit</Button>
                            <Button variant="outline" type="button">
                                Cancel
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
            </div>
        </div>
    )
}

export default DrawerForm