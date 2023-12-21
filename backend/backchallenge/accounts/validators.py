import functools
from django.conf import settings
from django.core.exceptions import ImproperlyConfigured, ValidationError
from django.utils.module_loading import import_string


@functools.lru_cache(maxsize=None)
def get_default_password_validators():
    return get_password_validators(settings.AUTH_PASSWORD_VALIDATORS)


def get_password_validators(validator_config):
    validators = []
    for validator in validator_config:
        try:
            klass = import_string(validator["NAME"])
        except ImportError:
            msg = (
                "The module in NAME could not be imported: %s. Check your "
                "AUTH_PASSWORD_VALIDATORS setting."
            )
            raise ImproperlyConfigured(msg % validator["NAME"])
        validators.append(klass(**validator.get("OPTIONS", {})))

    return validators


def validate_password(password, user=None, password_validators=None):
    """
    Validate that the password meets all validator requirements.

    If the password is valid, return ``None``.
    If the password is invalid, raise ValidationError with all error messages.
    """
    errors = []
    if password_validators is None:
        password_validators = get_default_password_validators()
    for validator in password_validators:
        try:
            validator.validate(password, user)
        except ValidationError as error:
            errors.append(error)
    if errors:
        raise ValidationError(errors)
