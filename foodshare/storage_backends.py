from storages.backends.s3boto3 import S3Boto3Storage
from django.core.files.storage import FileSystemStorage


class Local(FileSystemStorage):
    location = "media"
    file_permissions_mode = 0o777


class AWS(S3Boto3Storage):
    location = "media"
    file_overwrite = True
