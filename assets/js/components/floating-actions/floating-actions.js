evenPicServices.directive('floatingActions', function(
    Utils
) {
	return {
		templateUrl: 'assets/js/components/floating-actions/floating-actions.html',
		replace: true,
        link: function(scope) {
            const handleUploadPicture = event => {
                if (!event || !event.target) {
                    return false;
                }
                const picture = event.target.files[0];

                const reader = new FileReader();

                reader.readAsDataURL(picture);

                reader.onload = function() {
                    const base64Image = reader.result;

                    Utils.handleSubmitImage(base64Image);
                };
            };

            const init = () => {
                pictureInput.off('change');
				pictureInput.on('change', handleUploadPicture);
            };

            // Verificar se o dispositivo é um celular
            function isMobileDevice() {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            }

            // Verificar se o dispositivo é um tablet
            function isTabletDevice() {
                return /iPad|Android|Tablet/i.test(navigator.userAgent);
            }

            // Verificar se o dispositivo é um desktop
            function isDesktopDevice() {
                return !isMobileDevice() && !isTabletDevice();
            }

            var pictureInput = jQuery('#file');

			const openPictureInput = () => {
				pictureInput.trigger('click');
			}

            const handleUploadModal = ( ) => {
                console.log(1);
            };

            scope.onFindMeClick = () => {
                if (isMobileDevice() || isTabletDevice()) {
                    openPictureInput();
                } else if (isDesktopDevice()) {
                    openPictureInput();
                } else {
                    openPictureInput();
                }
            };

            init();
        }
	};
});
