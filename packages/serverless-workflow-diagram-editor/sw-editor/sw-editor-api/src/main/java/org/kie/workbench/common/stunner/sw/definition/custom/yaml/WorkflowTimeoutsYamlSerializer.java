package org.kie.workbench.common.stunner.sw.definition.custom.yaml;

import com.amihaiemil.eoyaml.YamlMapping;
import com.amihaiemil.eoyaml.YamlNode;
import org.kie.workbench.common.stunner.client.yaml.mapper.api.YAMLDeserializer;
import org.kie.workbench.common.stunner.client.yaml.mapper.api.YAMLSerializer;
import org.kie.workbench.common.stunner.client.yaml.mapper.api.exception.YAMLDeserializationException;
import org.kie.workbench.common.stunner.client.yaml.mapper.api.internal.deser.StringYAMLDeserializer;
import org.kie.workbench.common.stunner.client.yaml.mapper.api.internal.deser.YAMLDeserializationContext;
import org.kie.workbench.common.stunner.client.yaml.mapper.api.internal.ser.StringYAMLSerializer;
import org.kie.workbench.common.stunner.client.yaml.mapper.api.internal.ser.YAMLSerializationContext;
import org.kie.workbench.common.stunner.client.yaml.mapper.api.stream.YAMLSequenceWriter;
import org.kie.workbench.common.stunner.client.yaml.mapper.api.stream.YAMLWriter;
import org.kie.workbench.common.stunner.sw.definition.WorkflowTimeouts;
import org.kie.workbench.common.stunner.sw.definition.WorkflowTimeouts_YamlDeserializerImpl;
import org.kie.workbench.common.stunner.sw.definition.WorkflowTimeouts_YamlSerializerImpl;

import static com.amihaiemil.eoyaml.Node.SCALAR;

public class WorkflowTimeoutsYamlSerializer implements YAMLDeserializer, YAMLSerializer {

    private static final WorkflowTimeouts_YamlSerializerImpl serializer =
            new WorkflowTimeouts_YamlSerializerImpl();
    private static final WorkflowTimeouts_YamlDeserializerImpl deserializer =
            new WorkflowTimeouts_YamlDeserializerImpl();

    private static final StringYAMLSerializer stringJsonSerializer = new StringYAMLSerializer();

    private static final StringYAMLDeserializer stringJsonDeserializer = new StringYAMLDeserializer();


    @Override
    public Object deserialize(YamlMapping yaml, String key, YAMLDeserializationContext ctx) throws YAMLDeserializationException {
        YamlNode value = yaml.value(key);
        if (value == null) {
            return null;
        }
        return deserialize(value, ctx);
    }

    @Override
    public Object deserialize(YamlNode node, YAMLDeserializationContext ctx) {
        if (node == null) {
            return null;
        }
        if(node.type() == SCALAR) {
            return stringJsonDeserializer.deserialize(node, ctx);
        } else {
            return deserializer.deserialize(node, ctx);
        }
    }

    @Override
    public void serialize(YAMLWriter writer, String propertyName, Object value, YAMLSerializationContext ctx) {
        if (value instanceof String) {
            stringJsonSerializer.serialize(writer, propertyName, (String) value, ctx);
        } else if (value instanceof WorkflowTimeouts) {
            serializer.serialize(writer, propertyName, (WorkflowTimeouts) value, ctx);
        }
    }

    @Override
    public void serialize(YAMLSequenceWriter writer, Object obj, YAMLSerializationContext ctx) {
        if (obj instanceof String) {
            stringJsonSerializer.serialize(writer, (String) obj, ctx);
        } else if (obj instanceof WorkflowTimeouts) {
            serializer.serialize(writer, (WorkflowTimeouts) obj, ctx);
        }
    }
}
