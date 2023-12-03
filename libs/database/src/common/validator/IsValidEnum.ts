import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator'

@ValidatorConstraint({ name: 'isValidEnum', async: false })
export class IsValidEnum implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        const enumType = args.constraints[0] as any

        if (!enumType[value]) {
            return false
        }

        return true
    }

    defaultMessage(args: ValidationArguments) {
        return `${args.property} must be a valid enum value`
    }
}
