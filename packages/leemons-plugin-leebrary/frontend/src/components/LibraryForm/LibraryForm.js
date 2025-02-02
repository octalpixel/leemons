import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { isEmpty, isFunction, isNil, isString, toLower } from 'lodash';
import { Controller, useForm } from 'react-hook-form';
import {
  Box,
  Button,
  ColorInput,
  ContextContainer,
  FileUpload,
  ImageLoader,
  ImagePreviewInput,
  Stack,
  Textarea,
  TextInput,
  useResizeObserver,
  useViewportSize,
} from '@bubbles-ui/components';
import { CloudUploadIcon, CommonFileSearchIcon } from '@bubbles-ui/icons/outline';
import { addErrorAlert } from '@layout/alert';
import { TagsAutocomplete, useRequestErrorMessage } from '@common';
import {
  LIBRARY_FORM_DEFAULT_PROPS,
  LIBRARY_FORM_PROP_TYPES,
  LIBRARY_FORM_TYPES,
} from './LibraryForm.constants';
import { getUrlMetadataRequest } from '../../request';
import { AssetListDrawer } from '../AssetListDrawer';
import { getFileUrl, prepareAsset } from '../../helpers/prepareAsset';

// -----------------------------------------------------------------------------
// HELPERS

function isValidURL(url) {
  const urlPattern =
    /[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)?/gi;
  return urlPattern.test(url) ? true : 'Invalid URL';
}

function isImageFile(file) {
  if (file?.type && file?.type.indexOf('image') === 0) {
    return true;
  }

  const name = file?.path || file?.name;

  if (!isEmpty(name)) {
    const ext = toLower(name.split('.').at(-1));
    return ['png', 'jpeg', 'jpg', 'webp', 'gif', 'bmp'].includes(ext);
  }

  return false;
}

function isNullish(obj) {
  return Object.values(obj).every((value) => {
    if (isNil(value)) {
      return true;
    }

    return false;
  });
}

function getCoverUrl(cover) {
  if (cover?.id) {
    return getFileUrl(cover.id);
  }

  if (cover instanceof File) {
    return URL.createObjectURL(cover);
  }

  if (isString(cover) && isValidURL(cover)) {
    return cover;
  }

  if (isString(cover)) {
    console.log('A ver qué llega aquí:', cover);
  }

  return null;
}

// -----------------------------------------------------------------------------
// COMPONENT

const LibraryForm = ({
  labels,
  placeholders,
  helps,
  descriptions,
  errorMessages,
  useTags,
  pluginName,
  tagsType,
  asset,
  onSubmit,
  children,
  loading,
  type,
  form,
  onlyImages,
  hideTitle,
  hideSubmit,
  onChange = () => {},
}) => {
  const [isImage, setIsImage] = useState(onlyImages);
  const [checking, setChecking] = useState(false);
  const [urlMetadata, setUrlMetadata] = useState({});
  const [showAssetDrawer, setShowAssetDrawer] = useState(false);
  const [coverAsset, setCoverAsset] = useState(null);
  const [, , , getErrorMessage] = useRequestErrorMessage();
  const [boxRef, rect] = useResizeObserver();
  const { width: viewportWidth } = useViewportSize();

  // ························································
  // FORM SETUP

  const defaultValues = {
    file: asset?.file || null,
    name: asset?.name || '',
    tagline: asset?.tagline || '',
    description: asset?.description || '',
    color: asset?.color || '',
    cover: asset?.cover || null,
    url: asset?.url || null,
  };

  const {
    control,
    handleSubmit,
    watch,
    trigger,
    setValue,
    getValues,
    formState: { errors },
  } = form || useForm({ defaultValues });

  const formValues = watch();
  const coverFile = watch('cover');
  const assetFile = watch('file');
  const bookmarkUrl = watch('url');

  useEffect(() => {
    if (!isNullish(asset) && isEmpty(asset?.id)) {
      const valueNames = ['file', 'name', 'tagline', 'description', 'color', 'cover'];
      const values = getValues(valueNames);
      valueNames.forEach((valueName, index) => {
        setValue(valueName, asset[valueName] || values[index]);
      });
    }
  }, [asset]);

  useEffect(() => {
    if (!isEmpty(assetFile)) {
      const isImageType = isImageFile(assetFile);
      setIsImage(isImageType);
      setValue('name', assetFile.name.match(/(.+?)(\.[^.]+$|$)/)[1]);
    }
  }, [assetFile]);

  useEffect(() => {
    if (isEmpty(coverFile)) {
      setCoverAsset(null);
    }
  }, [coverFile]);

  useEffect(() => {
    // ES: El caso de uso es que el usuario cambie de soportar archivos, a solo imágenes
    // EN: The use case is that the user changes from supporting files to only images
    if (!isImage && !isNil(onlyImages)) {
      setIsImage(onlyImages);
    }
  }, [onlyImages, isImage]);

  useEffect(() => onChange(formValues), [formValues]);

  // ························································
  // HANDLERS

  const handleOnSubmit = (e) => {
    if (assetFile) e.file = assetFile;
    if (coverFile) e.cover = coverFile;
    if (asset.id) e.id = asset.id;
    if (urlMetadata?.logo) e.icon = urlMetadata.logo;
    if (coverAsset) e.cover = coverAsset.file.id;

    if (isFunction(onSubmit)) onSubmit(e);
  };

  const validateUrl = async () => {
    const isValid = await trigger('url', { shouldFocus: true });
    return isValid;
  };

  const handleCheckUrl = async () => {
    if (await validateUrl()) {
      try {
        setChecking(true);
        const url = bookmarkUrl;
        const result = await getUrlMetadataRequest(url);
        const metadata = result.metas;

        if (!isEmpty(metadata)) {
          setUrlMetadata(metadata);
          setValue('name', metadata.title);
          setValue('description', metadata.description);

          if (!isEmpty(metadata.image)) {
            setValue('cover', metadata.image);
          }
        }
        setChecking(false);
      } catch (err) {
        setChecking(false);
        addErrorAlert(getErrorMessage(err));
      }
    }
  };

  const handleOnCloseAssetDrawer = () => {
    setShowAssetDrawer(false);
  };

  const handleOnSelectAsset = (item) => {
    const preparedAsset = prepareAsset(item);
    setCoverAsset(preparedAsset);
    setValue('cover', preparedAsset.cover);
    setShowAssetDrawer(false);
  };

  // ························································
  // RENDER

  const getAssetIcon = useCallback(() => {
    if (type === LIBRARY_FORM_TYPES.BOOKMARKS && !isEmpty(urlMetadata.logo)) {
      return {
        icon: <ImageLoader src={urlMetadata.logo} width={26} height={26} radius={'4px'} />,
      };
    }

    return {};
  }, [type, urlMetadata]);

  const drawerSize = useMemo(
    () => Math.max(viewportWidth - rect.width - 370, 500),
    [viewportWidth, rect]
  );

  return (
    <Box ref={boxRef}>
      <form autoComplete="off" onSubmit={handleSubmit(handleOnSubmit)}>
        <ContextContainer title={!hideTitle ? labels.title : undefined} divided>
          <ContextContainer>
            {type === LIBRARY_FORM_TYPES.MEDIA_FILES && (
              <Controller
                control={control}
                name="file"
                shouldUnregister
                rules={{ required: errorMessages.file?.required || 'Field required' }}
                render={({ field: { ref, value, ...field } }) => (
                  <FileUpload
                    icon={<CloudUploadIcon height={32} width={32} />}
                    title={labels.browseFile}
                    subtitle={labels.dropFile}
                    errorMessage={{
                      title: 'Error',
                      message: errorMessages.file?.rejected || 'File was rejected',
                    }}
                    hideUploadButton
                    single
                    initialFiles={value ? [value] : []}
                    inputWrapperProps={{ error: errors.file }}
                    accept={onlyImages ? ['image/*'] : undefined}
                    {...field}
                  />
                )}
              />
            )}
            {type === LIBRARY_FORM_TYPES.BOOKMARKS && (
              <Controller
                control={control}
                name="url"
                shouldUnregister
                rules={{
                  required: errorMessages.url?.required || 'Field required',
                  validate: isValidURL,
                }}
                render={({ field }) => (
                  <Stack fullWidth alignItems="end" spacing={4}>
                    <Box style={{ flex: 1 }}>
                      <TextInput
                        label={labels.url}
                        placeholder={placeholders.url}
                        error={errors.url}
                        required
                        {...field}
                        onBlur={validateUrl}
                      />
                    </Box>
                    <Box skipFlex style={{ marginBottom: errors.url ? 18 : 0 }}>
                      <Button
                        size="sm"
                        color="tertiary"
                        leftIcon={<CommonFileSearchIcon />}
                        onClick={handleCheckUrl}
                        loading={checking}
                      >
                        {labels.checkUrl}
                      </Button>
                    </Box>
                  </Stack>
                )}
              />
            )}
            <Controller
              control={control}
              name="name"
              rules={{ required: errorMessages.name?.required || 'Field required' }}
              render={({ field }) => (
                <TextInput
                  label={labels.name}
                  placeholder={placeholders.name}
                  error={errors.name}
                  required
                  {...getAssetIcon()}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="tagline"
              rules={
                !isNil(errorMessages?.tagline?.required) && {
                  required: errorMessages.tagline.required,
                }
              }
              render={({ field }) => (
                <TextInput
                  label={labels.tagline}
                  placeholder={placeholders.tagline}
                  error={errors.tagline}
                  required={!isNil(errorMessages?.tagline?.required)}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="description"
              rules={
                !isNil(errorMessages?.description?.required) && {
                  required: errorMessages.description.required,
                }
              }
              render={({ field }) => (
                <Textarea
                  label={labels.description}
                  placeholder={placeholders.description}
                  required={!isNil(errorMessages?.description?.required)}
                  error={errors.description}
                  counter="word"
                  counterLabels={{
                    single: labels?.wordCounter?.single,
                    plural: labels?.wordCounter?.plural,
                  }}
                  showCounter
                  {...field}
                />
              )}
            />
            {useTags && (
              <Controller
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <TagsAutocomplete
                    pluginName={pluginName}
                    type={tagsType}
                    label={labels.tags}
                    labels={{ addButton: labels.addTag }}
                    placeholder={placeholders.tags}
                    {...field}
                  />
                )}
              />
            )}

            <Controller
              control={control}
              name="color"
              render={({ field }) => (
                <ColorInput
                  label={labels.color}
                  placeholder={placeholders.color}
                  useHsl
                  compact={false}
                  manual={false}
                  {...field}
                />
              )}
            />
          </ContextContainer>
          {!isImage && (
            <ContextContainer
              subtitle={labels.featuredImage}
              description={type === LIBRARY_FORM_TYPES.BOOKMARKS && descriptions?.featuredImage}
            >
              <Stack direction="row" spacing={3}>
                {!coverFile && (
                  <Button variant={'outline'} onClick={() => setShowAssetDrawer(true)}>
                    {labels.search}
                  </Button>
                )}
                <Controller
                  control={control}
                  name="cover"
                  render={({ field: { ref, value, ...field } }) => (
                    <ImagePreviewInput
                      labels={{
                        changeImage: labels.changeImage,
                        uploadButton: labels.uploadButton,
                      }}
                      previewURL={getCoverUrl(value)}
                      // previewURL={value}
                      value={''}
                      {...field}
                    />
                  )}
                />
              </Stack>
            </ContextContainer>
          )}
          {children}
          {!hideSubmit && (
            <Stack justifyContent={'end'} fullWidth>
              <Button type="submit" loading={loading}>
                {labels.submitForm}
              </Button>
            </Stack>
          )}
        </ContextContainer>
      </form>
      <AssetListDrawer
        opened={showAssetDrawer}
        onClose={handleOnCloseAssetDrawer}
        size={drawerSize}
        shadow={drawerSize <= 500}
        onSelect={handleOnSelectAsset}
        creatable
        onlyCreateImages
      />
    </Box>
  );
};

LibraryForm.defaultProps = LIBRARY_FORM_DEFAULT_PROPS;
LibraryForm.propTypes = LIBRARY_FORM_PROP_TYPES;

export { LibraryForm };
export default LibraryForm;
