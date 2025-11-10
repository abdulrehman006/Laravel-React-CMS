import AdminLayouts from "@/Admin/Layouts/AdminLayouts";
import TextInput from "@/Admin/Components/Inputs/TextInput.jsx";
import { useForm, Head } from "@inertiajs/react";

export default function GoogleMapsSettings({google_maps_config}) {
    const { data, setData, errors, put, processing } = useForm({
        google_maps_api_key: google_maps_config?.google_maps_api_key || ''
    });

    const handlePublish = (e) => {
        e.preventDefault();
        put(route('admin.settings.google.maps.update'));
    }

    return (
        <AdminLayouts>
            <Head title="Google Maps Settings" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container-fluid">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">Google Maps Settings</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <form className="row" onSubmit={handlePublish}>
                    <div className="col-lg-8">
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">
                                        Google Maps API Configuration
                                    </h2>
                                </div>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <TextInput
                                        title="Google Maps API Key"
                                        type="text"
                                        id="google_maps_api_key"
                                        error={errors?.google_maps_api_key}
                                        value={data.google_maps_api_key}
                                        onChange={(e) =>
                                            setData("google_maps_api_key", e.target.value)
                                        }
                                        placeholder="Enter your Google Maps API key"
                                    />
                                    <div className="alert alert-info mt-3">
                                        <strong>How to get Google Maps API Key:</strong>
                                        <ol className="mb-0 mt-2">
                                            <li>Go to <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer">Google Cloud Console</a></li>
                                            <li>Create a new project or select an existing one</li>
                                            <li>Enable the "Maps JavaScript API"</li>
                                            <li>Go to "Credentials" and create an API key</li>
                                            <li>Copy the API key and paste it above</li>
                                        </ol>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="btn btn-success"
                                            disabled={processing}
                                        >
                                            {processing ? 'Updating...' : 'Update'}
                                        </button>
                                    </div>
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                </div>
                            </div>
                        </div>
                        <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                    </div>
                </form>
            </div>
        </AdminLayouts>
    );
}
