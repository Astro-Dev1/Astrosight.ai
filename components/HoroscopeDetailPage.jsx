import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Calendar, Clock, TrendingUp, Heart, Briefcase, Activity, Gift } from 'lucide-react';

const HoroscopeDetailPage = ({ sign, period, data, translations, t }) => {
  console.log(translations)
  const [selectedTab, setSelectedTab] = useState('overview');

  // Capitalize sign name
  const capitalizedSign = sign?.charAt(0).toUpperCase() + sign?.slice(1);
  
  // Get period display name
  const getPeriodDisplayName = (period) => {
    switch(period) {
      case 'daily': return t('horoscope.daily') || 'Daily';
      case 'weekly': return t('horoscope.weekly') || 'Weekly'; 
      case 'monthly': return t('horoscope.monthly') || 'Monthly';
      case 'yearly': return t('horoscope.yearly') || 'Yearly';
      default: return period;
    }
  };

  // Star rating component
  const StarRating = ({ rating, label, color = "text-yellow-400" }) => {
    return (
      <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-sm">
        <span className="text-white font-medium">{label}</span>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${star <= (rating || 0) ? color + ' fill-current' : 'text-gray-400'}`}
            />
          ))}
          <span className="text-white ml-2 text-sm">{rating}/5</span>
        </div>
      </div>
    );
  };

  // Progress bar component
  const ProgressBar = ({ label, value, color = "bg-purple-500" }) => {
    return (
      <div className="mb-4">
        <div className="flex justify-between text-white text-sm mb-1">
          <span>{label}</span>
          <span>{value}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${color}`}
            style={{ width: `${value}%` }}
          ></div>
        </div>
      </div>
    );
  };

  // Timeline component for important dates
  const Timeline = ({ events }) => {
    if (!events || !Array.isArray(events)) return null;

    return (
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-3 h-3 bg-purple-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <div className="text-white font-medium">{event.date}</div>
              <div className="text-gray-300 text-sm">{event.description}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Section card component
  const SectionCard = ({ title, content, icon: Icon, gradient = "from-purple-600 to-blue-600" }) => {
    // Handle content that might be an object or string
    const renderContent = () => {
      if (typeof content === 'string') {
        return content;
      } else if (typeof content === 'object' && content !== null) {
        // If content is an object, try to extract text content
        if (content.text) return content.text;
        if (content.description) return content.description;
        if (content.content) return content.content;
        // If it's an object with multiple properties, stringify it safely
        return JSON.stringify(content, null, 2);
      }
      return "No content available.";
    };

    return (
      <Card className={`bg-gradient-to-r ${gradient} border-0 text-white mb-4`}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-lg">
            {Icon && <Icon className="w-5 h-5" />}
            <span>{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/90 leading-relaxed">{renderContent()}</p>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          {capitalizedSign} {getPeriodDisplayName(period)} Horoscope
        </h1>
        <div className="flex items-center justify-center space-x-4 text-gray-300">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>Updated today</span>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-sm mb-6">
          <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            Overview
          </TabsTrigger>
          <TabsTrigger value="ratings" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            Ratings
          </TabsTrigger>
          <TabsTrigger value="timeline" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            Timeline
          </TabsTrigger>
          <TabsTrigger value="tips" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            Tips
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Main Horoscope Content */}
          {data?.sections?.map((section, index) => (
            <SectionCard
              key={index}
              title={section.title || `Section ${index + 1}`}
              content={section.content || section.description || section.text || section}
              icon={
                section.title?.toLowerCase().includes('love') ? Heart :
                section.title?.toLowerCase().includes('career') ? Briefcase :
                section.title?.toLowerCase().includes('health') ? Activity :
                TrendingUp
              }
              gradient={
                section.title?.toLowerCase().includes('love') ? "from-pink-600 to-red-600" :
                section.title?.toLowerCase().includes('career') ? "from-blue-600 to-indigo-600" :
                section.title?.toLowerCase().includes('health') ? "from-green-600 to-teal-600" :
                "from-purple-600 to-blue-600"
              }
            />
          )) || (
            <SectionCard
              title="General Prediction"
              content={data?.prediction || data?.horoscope || data?.text || "Your horoscope prediction will appear here."}
              icon={TrendingUp}
            />
          )}

          {/* Overall Summary */}
          {data?.summary && (
            <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 border-0 text-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Gift className="w-5 h-5" />
                  <span>Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/90 leading-relaxed">
                  {typeof data.summary === 'string' ? data.summary : 
                   typeof data.summary === 'object' && data.summary.text ? data.summary.text :
                   typeof data.summary === 'object' ? JSON.stringify(data.summary) : 
                   "Summary not available"}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Ratings Tab */}
        <TabsContent value="ratings" className="space-y-4">
          <Card className="bg-white/10 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="text-white">Life Aspects Ratings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {data?.ratings ? (
                Object.entries(data.ratings).map(([key, value]) => (
                  <StarRating
                    key={key}
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    rating={parseInt(value) || 0}
                  />
                ))
              ) : (
                <>
                  <StarRating label="Love" rating={4} color="text-pink-400" />
                  <StarRating label="Career" rating={3} color="text-blue-400" />
                  <StarRating label="Health" rating={5} color="text-green-400" />
                  <StarRating label="Finance" rating={3} color="text-yellow-400" />
                  <StarRating label="Family" rating={4} color="text-purple-400" />
                </>
              )}
            </CardContent>
          </Card>

          {/* Progress Indicators */}
          {data?.progress && (
            <Card className="bg-white/10 backdrop-blur-sm border-0">
              <CardHeader>
                <CardTitle className="text-white">Life Progress</CardTitle>
              </CardHeader>
              <CardContent>
                {Object.entries(data.progress).map(([key, value]) => (
                  <ProgressBar
                    key={key}
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    value={parseInt(value) || 0}
                  />
                ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline" className="space-y-4">
          <Card className="bg-white/10 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Important Dates</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data?.important_dates || data?.timeline ? (
                <Timeline events={data.important_dates || data.timeline} />
              ) : (
                <div className="text-gray-300 text-center py-8">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>No important dates available for this period.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Lucky Elements */}
          {(data?.lucky_numbers || data?.lucky_colors || data?.lucky_days) && (
            <Card className="bg-gradient-to-r from-green-600 to-emerald-600 border-0 text-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Gift className="w-5 h-5" />
                  <span>Lucky Elements</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {data.lucky_numbers && (
                  <div>
                    <h4 className="font-medium mb-2">Lucky Numbers</h4>
                    <div className="flex flex-wrap gap-2">
                      {(Array.isArray(data.lucky_numbers) ? data.lucky_numbers : [data.lucky_numbers]).map((num, index) => (
                        <Badge key={index} variant="secondary" className="bg-white/20 text-white">
                          {num}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {data.lucky_colors && (
                  <div>
                    <h4 className="font-medium mb-2">Lucky Colors</h4>
                    <div className="flex flex-wrap gap-2">
                      {(Array.isArray(data.lucky_colors) ? data.lucky_colors : [data.lucky_colors]).map((color, index) => (
                        <Badge key={index} variant="secondary" className="bg-white/20 text-white">
                          {color}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {data.lucky_days && (
                  <div>
                    <h4 className="font-medium mb-2">Lucky Days</h4>
                    <div className="flex flex-wrap gap-2">
                      {(Array.isArray(data.lucky_days) ? data.lucky_days : [data.lucky_days]).map((day, index) => (
                        <Badge key={index} variant="secondary" className="bg-white/20 text-white">
                          {day}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Tips Tab */}
        <TabsContent value="tips" className="space-y-4">
          {data?.tips || data?.recommendations ? (
            <div className="space-y-4">
              {(data.tips || data.recommendations).map((tip, index) => (
                <Card key={index} className="bg-gradient-to-r from-orange-600 to-red-600 border-0 text-white">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <p className="text-white/90 leading-relaxed">{tip.content || tip}</p>
                        {tip.category && (
                          <Badge variant="secondary" className="bg-white/20 text-white mt-2">
                            {tip.category}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-white/10 backdrop-blur-sm border-0">
              <CardContent className="text-center py-12">
                <Gift className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-300">No tips available for this period.</p>
              </CardContent>
            </Card>
          )}

          {/* Remedies */}
          {data?.remedies && (
            <Card className="bg-gradient-to-r from-teal-600 to-cyan-600 border-0 text-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>Recommended Remedies</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {(Array.isArray(data.remedies) ? data.remedies : [data.remedies]).map((remedy, index) => (
                    <div key={index} className="p-3 bg-white/10 rounded-lg">
                      <p className="text-white/90">{remedy.description || remedy}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Navigation */}
      <div className="mt-8 flex justify-center space-x-4">
        <Button 
          variant="outline" 
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          onClick={() => window.history.back()}
        >
          Back
        </Button>
        <Button 
          className="bg-purple-600 hover:bg-purple-700 text-white"
          onClick={() => window.location.reload()}
        >
          Refresh
        </Button>
      </div>
    </div>
  );
};

export default HoroscopeDetailPage;
