import { useState, useRef } from 'react';
import { Upload, Camera, Eye, AlertCircle, CheckCircle, RefreshCw, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import scanInterface from '@/assets/scan-interface.png';
import Navbar from '@/components/layout/Navbar';

interface ScanResult {
  disease: string;
  severity: 'mild' | 'moderate' | 'severe';
  confidence: number;
  symptoms: string[];
  prevention: string[];
  treatment: string[];
}

const ScanPage = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mockScanResult: ScanResult = {
    disease: 'Diabetic Retinopathy',
    severity: 'moderate',
    confidence: 87,
    symptoms: [
      'Blurred or distorted vision',
      'Dark spots or strings floating in vision',
      'Difficulty seeing at night',
      'Colors appearing faded'
    ],
    prevention: [
      'Control blood sugar levels',
      'Regular eye examinations',
      'Maintain healthy blood pressure',
      'Exercise regularly and eat a balanced diet'
    ],
    treatment: [
      'Anti-VEGF injections',
      'Laser photocoagulation therapy',
      'Vitrectomy surgery (if severe)',
      'Regular monitoring by ophthalmologist'
    ]
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        performScan();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    // In a real app, this would open camera interface
    setUploadedImage(scanInterface);
    performScan();
  };

  const performScan = () => {
    setIsScanning(true);
    setScanResult(null);
    setScanProgress(0);

    // Simulate AI scanning process
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setScanResult(mockScanResult);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'bg-success text-white';
      case 'moderate': return 'bg-warning text-white';
      case 'severe': return 'bg-destructive text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'mild': return <CheckCircle size={16} />;
      case 'moderate': return <AlertCircle size={16} />;
      case 'severe': return <AlertCircle size={16} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      <Navbar />
      
      <div className="pt-20 pb-8 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-8 animate-fadeInUp">
          <h1 className="text-4xl font-bold text-gradient mb-4">AI Eye Disease Scanner</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload an eye image or use your camera to get instant AI-powered analysis for early disease detection
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="card-glass animate-slideInRight">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="text-primary" size={24} />
                <span>Upload Eye Image</span>
              </CardTitle>
              <CardDescription>
                Choose an image file or capture with your camera for analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors duration-300 group cursor-pointer"
                   onClick={() => fileInputRef.current?.click()}>
                {uploadedImage ? (
                  <div className="space-y-4">
                    <img src={uploadedImage} alt="Uploaded eye" className="max-h-48 mx-auto rounded-lg shadow-medium" />
                    <p className="text-sm text-muted-foreground">Click to change image</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="mx-auto text-muted-foreground group-hover:text-primary transition-colors duration-300" size={48} />
                    <div>
                      <p className="text-lg font-medium">Drop your eye image here</p>
                      <p className="text-sm text-muted-foreground">or click to browse files</p>
                    </div>
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="h-12 flex items-center space-x-2"
                >
                  <Upload size={18} />
                  <span>Upload File</span>
                </Button>
                <Button
                  onClick={handleCameraCapture}
                  className="h-12 btn-primary flex items-center space-x-2"
                >
                  <Camera size={18} />
                  <span>Use Camera</span>
                </Button>
              </div>

              {/* Scanning Progress */}
              {isScanning && (
                <div className="space-y-4 animate-zoomIn">
                  <div className="flex items-center space-x-3">
                    <Zap className="text-primary animate-pulse" size={20} />
                    <span className="font-medium">AI Analysis in Progress...</span>
                  </div>
                  <Progress value={scanProgress} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    Processing image with advanced AI algorithms
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="card-glass animate-slideInRight" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="text-primary" size={24} />
                <span>Analysis Results</span>
              </CardTitle>
              <CardDescription>
                Detailed AI-powered analysis of your eye image
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!scanResult && !isScanning && (
                <div className="text-center py-12 space-y-4">
                  <Eye className="mx-auto text-muted-foreground/50" size={64} />
                  <p className="text-lg text-muted-foreground">Upload an image to see analysis results</p>
                </div>
              )}

              {scanResult && (
                <div className="space-y-6 animate-fadeInUp">
                  {/* Disease Detection */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Detected Condition</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-foreground">{scanResult.disease}</span>
                      <Badge className={`${getSeverityColor(scanResult.severity)} flex items-center space-x-1`}>
                        {getSeverityIcon(scanResult.severity)}
                        <span className="capitalize">{scanResult.severity}</span>
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Confidence:</span>
                      <Progress value={scanResult.confidence} className="flex-1 h-2" />
                      <span className="text-sm font-medium">{scanResult.confidence}%</span>
                    </div>
                  </div>

                  {/* Symptoms */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Common Symptoms</h4>
                    <ul className="space-y-2">
                      {scanResult.symptoms.map((symptom, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Prevention */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Prevention Tips</h4>
                    <ul className="space-y-2">
                      {scanResult.prevention.map((tip, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="text-success mt-0.5 flex-shrink-0" size={16} />
                          <span className="text-sm text-muted-foreground">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Treatment */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Treatment Options</h4>
                    <ul className="space-y-2">
                      {scanResult.treatment.map((treatment, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{treatment}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <Button
                      onClick={() => {
                        setScanResult(null);
                        setUploadedImage(null);
                      }}
                      variant="outline"
                      className="flex items-center space-x-2"
                    >
                      <RefreshCw size={16} />
                      <span>New Scan</span>
                    </Button>
                    <Button className="btn-primary flex items-center space-x-2">
                      <Eye size={16} />
                      <span>Find Doctors</span>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Disclaimer */}
        <Alert className="mt-8 max-w-4xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Medical Disclaimer:</strong> This AI analysis is for informational purposes only and should not replace professional medical advice. 
            Please consult with a qualified healthcare provider for proper diagnosis and treatment.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default ScanPage;