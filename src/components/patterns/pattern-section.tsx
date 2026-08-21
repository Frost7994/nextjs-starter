import type * as React from "react";

import { CodeBlock } from "@/components/patterns/code-block";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type PatternCodeStep = {
  title: string;
  description?: string;
  language: string;
  code: string;
};

type PatternSectionProps = {
  title: string;
  description: string;
  tags?: string[];
  example: React.ReactNode;
  steps: PatternCodeStep[];
};

function PatternSection({ title, description, tags, example, steps }: PatternSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        {tags && tags.length > 0 && (
          <CardAction>
            <div className="flex flex-wrap justify-end gap-1.5">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardAction>
        )}
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="example">
          <TabsList>
            <TabsTrigger value="example">Example</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="example" className="pt-4">
            <div className="flex items-center justify-center rounded-xl border border-border bg-muted/30 p-8">
              {example}
            </div>
          </TabsContent>
          <TabsContent value="code" className="flex flex-col gap-5 pt-4">
            {steps.map((step, index) => (
              <div key={step.title} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{index + 1}</Badge>
                  <h3 className="text-sm font-medium">{step.title}</h3>
                </div>
                {step.description && (
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                )}
                <CodeBlock language={step.language} code={step.code} />
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

export { PatternSection };
export type { PatternCodeStep, PatternSectionProps };
